import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, TimerOff } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { countWords, type WritingContent } from "@/lib/exercise-content";
import { GradeForm } from "@/components/admin/grade-form";

export const metadata = { title: "Chấm bài" };

export default async function GradeAttemptPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  await requireAdmin();
  const { attemptId } = await params;

  const attempt = await db.attempt.findUnique({
    where: { id: attemptId },
    include: { user: true, exercise: true },
  });
  if (!attempt || attempt.status === "IN_PROGRESS") redirect("/quan-tri/cham-bai");

  const content = JSON.parse(attempt.exercise.content) as WritingContent;
  const essay =
    (JSON.parse(attempt.answers || "{}") as { essay?: string }).essay ?? "";
  const words = countWords(essay);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/quan-tri/cham-bai"
        className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-navy hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Hàng chờ chấm
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps">Chấm bài Writing</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-navy-deep">
            {attempt.user.name}
          </h1>
          <p className="mt-2 font-ui text-sm text-muted">
            {attempt.user.email} · {attempt.exercise.title}
          </p>
        </div>
        <dl className="flex gap-6 font-ui text-sm text-ink-soft">
          <div>
            <dt className="label-caps">Số từ</dt>
            <dd className="mt-1 text-lg font-bold tabular-nums text-navy-deep">
              {words}
              <span className="text-sm font-normal text-muted">
                /{content.minWords}
              </span>
            </dd>
          </div>
          <div>
            <dt className="label-caps">Nộp lúc</dt>
            <dd className="mt-1 text-lg font-bold tabular-nums text-navy-deep">
              {attempt.submittedAt?.toLocaleString("vi-VN", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </dd>
          </div>
        </dl>
      </div>
      {attempt.autoSubmitted && (
        <p className="mt-4 inline-flex items-center gap-2 border-l-4 border-danger bg-danger-pale px-4 py-2 font-ui text-sm text-danger">
          <TimerOff className="h-4 w-4" aria-hidden="true" />
          Bài được hệ thống tự nộp khi hết giờ.
        </p>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div>
          <div className="border-l-4 border-gold bg-cream-deep px-6 py-4 text-[0.95rem] italic leading-relaxed text-ink-soft">
            {content.prompt.split("\n\n").map((p, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 border border-line bg-paper p-8 shadow-card">
            <p className="label-caps">Bài làm của học viên</p>
            {essay ? (
              <div className="mt-5 space-y-4 leading-[1.9] text-ink">
                {essay.split(/\n+/).map((p, i) => p.trim() && <p key={i}>{p}</p>)}
              </div>
            ) : (
              <p className="mt-5 italic text-muted">Bài nộp không có nội dung.</p>
            )}
          </div>
        </div>

        <aside className="h-fit border border-line bg-paper p-7 shadow-card lg:sticky lg:top-6">
          <p className="label-caps">
            {attempt.status === "GRADED" ? "Chấm lại" : "Chấm điểm"}
          </p>
          <div className="mt-5">
            <GradeForm
              attemptId={attempt.id}
              initialBand={attempt.band}
              initialFeedback={attempt.feedback}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
