import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Hourglass,
  ArrowLeft,
  TimerOff,
} from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import {
  gradeReading,
  countWords,
  type ReadingContent,
  type WritingContent,
} from "@/lib/exercise-content";
import { NoteBox } from "@/components/ui";

export const metadata = { title: "Kết quả bài làm" };

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default async function AttemptResultPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const user = await requireUser();

  const attempt = await db.attempt.findUnique({
    where: { id: attemptId },
    include: { exercise: true },
  });
  if (!attempt || (attempt.userId !== user.id && user.role !== "ADMIN")) {
    redirect("/hoc-vien");
  }
  if (attempt.status === "IN_PROGRESS") redirect(`/lam-bai/${attempt.id}`);

  const isReading = attempt.exercise.skill === "READING";

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <Link
        href="/hoc-vien"
        className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-navy hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Hồ sơ học tập
      </Link>

      <div className="mt-6">
        <p className="label-caps">
          {isReading ? "Kết quả Reading" : "Bài Writing đã nộp"}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-deep md:text-4xl">
          {attempt.exercise.title}
        </h1>
        <div className="rule-gold mt-5" />
        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 font-ui text-sm text-ink-soft">
          <div>
            <dt className="inline font-semibold text-ink">Nộp lúc: </dt>
            <dd className="inline">{fmt(attempt.submittedAt)}</dd>
          </div>
          {attempt.autoSubmitted && (
            <div className="flex items-center gap-1.5 text-danger">
              <TimerOff className="h-4 w-4" aria-hidden="true" />
              Tự động nộp khi hết giờ
            </div>
          )}
        </dl>
      </div>

      {isReading ? (
        <ReadingResult attempt={attempt} />
      ) : (
        <WritingResult attempt={attempt} />
      )}
    </section>
  );
}

function ReadingResult({
  attempt,
}: {
  attempt: {
    answers: string;
    scoreRaw: number | null;
    scoreTotal: number | null;
    exercise: { content: string };
  };
}) {
  const content = JSON.parse(attempt.exercise.content) as ReadingContent;
  const answers = JSON.parse(attempt.answers || "{}");
  const { detail } = gradeReading(content, answers);

  const pct =
    attempt.scoreTotal && attempt.scoreTotal > 0
      ? Math.round(((attempt.scoreRaw ?? 0) / attempt.scoreTotal) * 100)
      : 0;

  return (
    <>
      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
        <div className="bg-paper p-7 text-center">
          <p className="label-caps">Số câu đúng</p>
          <p className="mt-3 font-display text-5xl font-bold text-navy-deep">
            {attempt.scoreRaw}
            <span className="text-2xl text-muted">/{attempt.scoreTotal}</span>
          </p>
        </div>
        <div className="bg-paper p-7 text-center">
          <p className="label-caps">Tỷ lệ chính xác</p>
          <p className="mt-3 font-display text-5xl font-bold text-gold">{pct}%</p>
        </div>
        <div className="bg-paper p-7 text-center">
          <p className="label-caps">Đánh giá</p>
          <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink">
            {pct >= 85
              ? "Xuất sắc"
              : pct >= 65
                ? "Vững vàng"
                : pct >= 45
                  ? "Cần luyện thêm"
                  : "Nền tảng"}
          </p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-navy-deep">
        Chi tiết từng câu
      </h2>
      <ol className="mt-6 divide-y divide-line border-y border-line">
        {detail.map((q, i) => (
          <li key={q.id} className="flex gap-4 py-4">
            {q.correct ? (
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <XCircle className="mt-1 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p className="leading-relaxed text-ink">
                <span className="font-ui text-sm font-bold tabular-nums text-gold">
                  {i + 1}.
                </span>{" "}
                {q.prompt}
              </p>
              <p className="mt-1.5 font-ui text-sm">
                <span className={q.correct ? "text-success" : "text-danger"}>
                  Bạn trả lời: {q.userAnswer || "(bỏ trống)"}
                </span>
                {!q.correct && (
                  <span className="ml-4 text-success">
                    Đáp án đúng: {q.correctAnswer}
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <NoteBox className="mt-10" title="Bước tiếp theo">
        Đọc lại passage và đối chiếu những câu sai — xác định bạn sai vì từ vựng,
        vì kỹ thuật định vị hay vì suy diễn. Làm lại bài sau 2–3 ngày để kiểm tra
        mức tiến bộ thật.
      </NoteBox>
    </>
  );
}

function WritingResult({
  attempt,
}: {
  attempt: {
    answers: string;
    status: string;
    band: number | null;
    feedback: string | null;
    gradedAt: Date | null;
    exercise: { content: string };
  };
}) {
  const content = JSON.parse(attempt.exercise.content) as WritingContent;
  const parsed = JSON.parse(attempt.answers || "{}") as { essay?: string };
  const essay = parsed.essay ?? "";
  const words = countWords(essay);
  const graded = attempt.status === "GRADED";

  return (
    <>
      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
        <div className="bg-paper p-7 text-center">
          <p className="label-caps">Trạng thái</p>
          <p className="mt-3 flex items-center justify-center gap-2 font-display text-2xl font-bold text-ink">
            {graded ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
                Đã chấm
              </>
            ) : (
              <>
                <Hourglass className="h-6 w-6 text-gold" aria-hidden="true" />
                Chờ chấm
              </>
            )}
          </p>
        </div>
        <div className="bg-paper p-7 text-center">
          <p className="label-caps">Band điểm</p>
          <p className="mt-3 font-display text-5xl font-bold text-gold">
            {graded && attempt.band != null ? attempt.band.toFixed(1) : "—"}
          </p>
        </div>
        <div className="bg-paper p-7 text-center">
          <p className="label-caps">Số từ</p>
          <p className="mt-3 font-display text-5xl font-bold text-navy-deep">
            {words}
            <span className="text-2xl text-muted">/{content.minWords}</span>
          </p>
        </div>
      </div>

      {graded && attempt.feedback && (
        <div className="mt-10 border-l-4 border-gold bg-cream-deep p-7">
          <p className="label-caps">Nhận xét của giáo viên</p>
          <div className="mt-4 space-y-3 leading-relaxed text-ink">
            {attempt.feedback.split("\n").map(
              (line, i) => line.trim() && <p key={i}>{line}</p>
            )}
          </div>
          <p className="mt-4 font-ui text-xs text-muted">
            Chấm lúc {fmtDate(attempt.gradedAt)}
          </p>
        </div>
      )}

      {!graded && (
        <NoteBox className="mt-10" title="Đang trong hàng chờ">
          Giáo viên sẽ chấm bài theo rubric 4 tiêu chí và trả nhận xét trong
          vòng 48 giờ. Kết quả sẽ hiển thị ngay tại trang này.
        </NoteBox>
      )}

      <h2 className="mt-12 font-display text-2xl font-bold text-navy-deep">
        Bài viết của bạn
      </h2>
      <div className="mt-5 border border-line bg-paper p-7 shadow-card md:p-9">
        <p className="mb-5 border-b border-line pb-4 text-[0.92rem] italic leading-relaxed text-ink-soft">
          {content.prompt.split("\n\n")[0]}
        </p>
        {essay ? (
          <div className="space-y-4 leading-[1.9] text-ink">
            {essay.split(/\n+/).map((p, i) => p.trim() && <p key={i}>{p}</p>)}
          </div>
        ) : (
          <p className="italic text-muted">Bài nộp không có nội dung.</p>
        )}
      </div>
    </>
  );
}

function fmtDate(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}
