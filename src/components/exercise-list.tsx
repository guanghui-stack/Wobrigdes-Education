import Link from "next/link";
import { CalendarClock, CheckCircle2, PlayCircle, RotateCcw } from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { startAttemptAction } from "@/lib/actions/attempts";
import { SubmitButton } from "@/components/ui";

/** Danh sách bài luyện của một kỹ năng, kèm trạng thái bài làm của học viên. */
export async function ExerciseList({ skill }: { skill: "READING" | "WRITING" }) {
  const user = await getCurrentUser();
  const exercises = await db.exercise.findMany({
    where: { skill, published: true },
    orderBy: { createdAt: "asc" },
  });

  const attempts = user
    ? await db.attempt.findMany({
        where: { userId: user.id, exercise: { skill } },
        orderBy: { startedAt: "desc" },
      })
    : [];

  if (exercises.length === 0) {
    return (
      <div className="border border-line bg-paper p-10 text-center text-ink-soft">
        Chưa có bài luyện nào được mở — vui lòng quay lại sau.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {exercises.map((ex, idx) => {
        const mine = attempts.filter((a) => a.exerciseId === ex.id);
        const inProgress = mine.find((a) => a.status === "IN_PROGRESS");
        const best = mine
          .filter((a) => a.status !== "IN_PROGRESS")
          .sort((a, b) => (b.scoreRaw ?? -1) - (a.scoreRaw ?? -1))[0];

        return (
          <article
            key={ex.id}
            className="flex flex-col gap-5 border border-line bg-paper p-7 shadow-card md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-ui text-sm font-bold tabular-nums text-gold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold text-navy-deep">
                  {ex.title}
                </h3>
              </div>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                {ex.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 font-ui text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                  {ex.durationMinutes} phút · tự nộp khi hết giờ
                </span>
                {best && ex.skill === "READING" && best.scoreRaw != null && (
                  <span className="flex items-center gap-1.5 text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Kết quả tốt nhất: {best.scoreRaw}/{best.scoreTotal}
                  </span>
                )}
                {best && ex.skill === "WRITING" && (
                  <span className="flex items-center gap-1.5 text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {best.status === "GRADED" && best.band != null
                      ? `Đã chấm: Band ${best.band.toFixed(1)}`
                      : "Đã nộp — đang chờ chấm"}
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0">
              {!user ? (
                <Link
                  href="/dang-nhap"
                  className="inline-flex items-center gap-2 border border-navy px-6 py-2.5 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-navy hover:text-paper"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Đăng nhập để làm bài
                </Link>
              ) : (
                <form action={startAttemptAction.bind(null, ex.id)}>
                  <SubmitButton variant={inProgress ? "gold" : "primary"}>
                    {inProgress ? (
                      <>
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        Tiếp tục bài dang dở
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4" aria-hidden="true" />
                        {mine.length > 0 ? "Làm lại" : "Bắt đầu làm bài"}
                      </>
                    )}
                  </SubmitButton>
                </form>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
