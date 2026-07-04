"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Send, CloudUpload } from "lucide-react";
import { Countdown } from "@/components/exam/countdown";
import { saveProgressAction, submitAttemptAction } from "@/lib/actions/attempts";
import { countWords } from "@/lib/exercise-content";
import type { ReadingContent, WritingContent } from "@/lib/exercise-content";
import { BridgeMark } from "@/components/brand";

type BaseProps = {
  attemptId: string;
  title: string;
  deadlineIso: string;
  initialAnswers: string; // JSON đã lưu (autosave từ phiên trước)
};

/** Khung chung phòng thi: thanh trên cùng (brand + đồng hồ + nộp bài), autosave, tự nộp khi hết giờ. */
function useExamController(attemptId: string, getAnswersJson: () => string) {
  const [isSubmitting, startSubmit] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const submittedRef = useRef(false);

  const submit = useCallback(
    (auto: boolean) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      startSubmit(async () => {
        await submitAttemptAction(attemptId, getAnswersJson(), auto);
      });
    },
    [attemptId, getAnswersJson]
  );

  // Autosave mỗi 20 giây
  useEffect(() => {
    const id = setInterval(async () => {
      if (submittedRef.current) return;
      const res = await saveProgressAction(attemptId, getAnswersJson());
      if (res.ok) setSavedAt(new Date());
    }, 20_000);
    return () => clearInterval(id);
  }, [attemptId, getAnswersJson]);

  return { submit, isSubmitting, savedAt };
}

function ExamShell({
  title,
  deadlineIso,
  onExpire,
  onSubmit,
  isSubmitting,
  savedAt,
  children,
}: {
  title: string;
  deadlineIso: string;
  onExpire: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  savedAt: Date | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <header className="sticky top-0 z-40 border-b border-line bg-paper shadow-card">
        <div className="h-[3px] bg-gold" />
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <BridgeMark className="h-8 w-8 shrink-0" />
            <h1 className="truncate font-display text-base font-bold text-navy-deep md:text-lg">
              {title}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {savedAt && (
              <span className="hidden items-center gap-1.5 font-ui text-xs text-muted md:flex">
                <CloudUpload className="h-3.5 w-3.5" aria-hidden="true" />
                Đã lưu {savedAt.toLocaleTimeString("vi-VN")}
              </span>
            )}
            <Countdown deadlineIso={deadlineIso} onExpire={onExpire} />
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex cursor-pointer items-center gap-2 border border-navy bg-navy px-5 py-2 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              {isSubmitting ? "Đang nộp…" : "Nộp bài"}
            </button>
          </div>
        </div>
      </header>
      {children}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40">
          <div className="border border-line bg-paper px-10 py-8 text-center shadow-lift">
            <p className="font-display text-xl font-bold text-navy-deep">Đang nộp bài…</p>
            <p className="mt-2 font-ui text-sm text-ink-soft">Vui lòng không đóng trang.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== READING ===================== */

export function ReadingExam({
  attemptId,
  title,
  deadlineIso,
  initialAnswers,
  content,
}: BaseProps & { content: ReadingContent }) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(initialAnswers || "{}");
    } catch {
      return {};
    }
  });
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const getAnswersJson = useCallback(() => JSON.stringify(answersRef.current), []);
  const { submit, isSubmitting, savedAt } = useExamController(attemptId, getAnswersJson);

  const totalQuestions = useMemo(
    () => content.questionGroups.reduce((n, g) => n + g.questions.length, 0),
    [content]
  );
  const answered = Object.values(answers).filter((v) => v.trim()).length;

  const setAnswer = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  let questionNo = 0;

  return (
    <ExamShell
      title={title}
      deadlineIso={deadlineIso}
      onExpire={() => submit(true)}
      onSubmit={() => submit(false)}
      isSubmitting={isSubmitting}
      savedAt={savedAt}
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Passage */}
        <section
          aria-label="Bài đọc"
          className="border border-line bg-paper p-6 shadow-card md:p-8 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto"
        >
          <p className="label-caps">Reading Passage</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy-deep">
            {content.passage.title}
          </h2>
          <div className="rule-gold mt-4" />
          <div className="mt-6 space-y-5 leading-[1.85] text-ink">
            {content.passage.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Câu hỏi */}
        <section aria-label="Câu hỏi" className="space-y-6">
          <div className="border border-line bg-cream-deep px-5 py-3 font-ui text-sm text-ink-soft">
            Đã trả lời{" "}
            <strong className="tabular-nums text-navy-deep">
              {answered}/{totalQuestions}
            </strong>{" "}
            câu — bài sẽ tự nộp khi hết giờ.
          </div>
          {content.questionGroups.map((group, gi) => (
            <fieldset key={gi} className="border border-line bg-paper p-6 shadow-card md:p-7">
              <legend className="label-caps float-left mb-4 w-full">
                {group.type === "TFNG"
                  ? "True / False / Not Given"
                  : group.type === "MC"
                    ? "Multiple Choice"
                    : "Completion"}
              </legend>
              <p className="clear-both text-[0.92rem] italic leading-relaxed text-ink-soft">
                {group.instruction}
              </p>
              <ol className="mt-6 space-y-6">
                {group.questions.map((q) => {
                  questionNo += 1;
                  const no = questionNo;
                  return (
                    <li key={q.id}>
                      <p className="flex gap-3 leading-relaxed text-ink">
                        <span className="font-ui text-sm font-bold tabular-nums text-gold">
                          {no}.
                        </span>
                        <span>{q.prompt}</span>
                      </p>
                      {group.type === "GAP" ? (
                        <input
                          type="text"
                          value={answers[q.id] ?? ""}
                          onChange={(e) => setAnswer(q.id, e.target.value)}
                          aria-label={`Câu ${no}`}
                          placeholder="Điền đáp án…"
                          className="mt-3 w-full max-w-sm border border-line-strong bg-cream px-4 py-2.5 font-ui text-[0.95rem] focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                        />
                      ) : (
                        <div
                          className={`mt-3 ${group.type === "TFNG" ? "flex flex-wrap gap-2" : "space-y-2"}`}
                        >
                          {(q.options ?? []).map((opt) => {
                            const value =
                              group.type === "MC" ? opt.trim().charAt(0) : opt;
                            const checked = answers[q.id] === value;
                            return (
                              <label
                                key={opt}
                                className={`flex cursor-pointer items-center gap-3 border px-4 py-2.5 font-ui text-sm transition-colors ${
                                  checked
                                    ? "border-navy bg-navy text-paper"
                                    : "border-line bg-cream text-ink hover:border-navy"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={value}
                                  checked={checked}
                                  onChange={() => setAnswer(q.id, value)}
                                  className="sr-only"
                                />
                                {opt}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </fieldset>
          ))}
        </section>
      </div>
    </ExamShell>
  );
}

/* ===================== WRITING ===================== */

export function WritingExam({
  attemptId,
  title,
  deadlineIso,
  initialAnswers,
  content,
}: BaseProps & { content: WritingContent }) {
  const [essay, setEssay] = useState<string>(() => {
    try {
      return JSON.parse(initialAnswers || "{}").essay ?? "";
    } catch {
      return "";
    }
  });
  const essayRef = useRef(essay);
  essayRef.current = essay;
  const getAnswersJson = useCallback(
    () =>
      JSON.stringify({
        essay: essayRef.current,
        wordCount: countWords(essayRef.current),
      }),
    []
  );
  const { submit, isSubmitting, savedAt } = useExamController(attemptId, getAnswersJson);

  const words = countWords(essay);
  const enough = words >= content.minWords;

  return (
    <ExamShell
      title={title}
      deadlineIso={deadlineIso}
      onExpire={() => submit(true)}
      onSubmit={() => submit(false)}
      isSubmitting={isSubmitting}
      savedAt={savedAt}
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-[2fr_3fr] lg:gap-8">
        {/* Đề bài */}
        <section
          aria-label="Đề bài"
          className="h-fit border border-line bg-paper p-6 shadow-card md:p-8 lg:sticky lg:top-24"
        >
          <p className="label-caps">
            IELTS Writing {content.task === "TASK_1" ? "Task 1" : "Task 2"}
          </p>
          <div className="rule-gold mt-4" />
          <div className="mt-6 space-y-4 leading-[1.8] text-ink">
            {content.prompt.split("\n\n").map((p, i) => (
              <p key={i} className={i === 0 ? "" : "font-semibold"}>
                {p}
              </p>
            ))}
          </div>
          {content.dataTable && (
            <table className="mt-6 w-full border border-line font-ui text-sm">
              <caption className="border border-b-0 border-line bg-cream-deep px-3 py-2 text-left text-[0.82rem] font-semibold text-ink">
                {content.dataTable.caption}
              </caption>
              <thead>
                <tr className="bg-navy text-paper">
                  {content.dataTable.headers.map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {content.dataTable.rows.map((row, ri) => (
                  <tr key={ri} className="bg-paper">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-3 py-2 ${ci === 0 ? "font-semibold text-ink" : "tabular-nums text-ink-soft"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {content.guidance && (
            <p className="mt-6 border-l-4 border-gold bg-cream-deep px-4 py-3 text-[0.88rem] leading-relaxed text-ink-soft">
              {content.guidance}
            </p>
          )}
        </section>

        {/* Vùng viết */}
        <section aria-label="Bài viết" className="flex flex-col">
          <div className="flex items-center justify-between border border-b-0 border-line bg-paper px-5 py-3">
            <label
              htmlFor="essay"
              className="font-ui text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink"
            >
              Bài viết của bạn
            </label>
            <span
              className={`font-ui text-sm font-semibold tabular-nums ${
                enough ? "text-success" : "text-ink-soft"
              }`}
            >
              {words} từ{" "}
              <span className="font-normal text-muted">
                / tối thiểu {content.minWords}
              </span>
            </span>
          </div>
          <textarea
            id="essay"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            spellCheck={false}
            placeholder="Bắt đầu viết tại đây… Bài của bạn được tự động lưu mỗi 20 giây."
            className="min-h-[60dvh] flex-1 resize-y border border-line bg-paper p-6 font-body text-[1.05rem] leading-[1.9] text-ink shadow-card focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
          <p className="mt-3 font-ui text-xs leading-relaxed text-muted">
            Giáo viên sẽ chấm theo rubric 4 tiêu chí (Task Achievement, Coherence
            &amp; Cohesion, Lexical Resource, Grammatical Range &amp; Accuracy) và
            trả nhận xét trong vòng 48 giờ.
          </p>
        </section>
      </div>
    </ExamShell>
  );
}
