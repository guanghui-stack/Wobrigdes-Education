import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  PenLine,
  Hourglass,
  CheckCircle2,
  ArrowRight,
  LogOut,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import { ButtonLink, NoteBox } from "@/components/ui";

export const metadata: Metadata = { title: "Hồ sơ học tập" };

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default async function StudentDashboard() {
  const user = await requireUser();

  const attempts = await db.attempt.findMany({
    where: { userId: user.id },
    include: { exercise: true },
    orderBy: { startedAt: "desc" },
  });

  const finished = attempts.filter((a) => a.status !== "IN_PROGRESS");
  const inProgress = attempts.filter(
    (a) => a.status === "IN_PROGRESS" && a.deadlineAt.getTime() > Date.now()
  );
  const readingDone = finished.filter((a) => a.exercise.skill === "READING");
  const writingDone = finished.filter((a) => a.exercise.skill === "WRITING");
  const waitingGrade = writingDone.filter((a) => a.status === "SUBMITTED").length;
  const bestReading = readingDone.reduce<number | null>((best, a) => {
    if (a.scoreRaw == null || a.scoreTotal == null || a.scoreTotal === 0) return best;
    const pct = (a.scoreRaw / a.scoreTotal) * 100;
    return best == null || pct > best ? pct : best;
  }, null);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 py-12">
          <div>
            <p className="label-caps">Hồ sơ học tập</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">
              Xin chào, {user.name}
            </h1>
            <div className="rule-gold mt-5" />
            <p className="mt-4 font-ui text-sm text-muted">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/doi-mat-khau"
              className="flex items-center gap-2 border border-line px-5 py-2.5 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-navy hover:text-navy"
            >
              <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
              Đổi mật khẩu
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-2 border border-line px-5 py-2.5 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-danger hover:text-danger"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Thống kê */}
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-paper p-6">
            <p className="label-caps flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Reading đã làm
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-navy-deep">
              {readingDone.length}
            </p>
          </div>
          <div className="bg-paper p-6">
            <p className="label-caps flex items-center gap-2">
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              Writing đã nộp
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-navy-deep">
              {writingDone.length}
            </p>
          </div>
          <div className="bg-paper p-6">
            <p className="label-caps flex items-center gap-2">
              <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />
              Chờ chấm
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-gold">
              {waitingGrade}
            </p>
          </div>
          <div className="bg-paper p-6">
            <p className="label-caps flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Reading tốt nhất
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-success">
              {bestReading != null ? `${Math.round(bestReading)}%` : "—"}
            </p>
          </div>
        </div>

        {/* Bài đang làm dở */}
        {inProgress.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold text-navy-deep">
              Bài đang làm dở
            </h2>
            <div className="mt-5 space-y-4">
              {inProgress.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-4 border-l-4 border-gold bg-cream-deep px-6 py-4"
                >
                  <div>
                    <p className="font-ui font-semibold text-ink">{a.exercise.title}</p>
                    <p className="mt-1 font-ui text-sm text-ink-soft">
                      Hạn nộp: {fmt(a.deadlineAt)} — đồng hồ vẫn đang chạy!
                    </p>
                  </div>
                  <Link
                    href={`/lam-bai/${a.id}`}
                    className="flex items-center gap-2 border border-gold bg-gold px-5 py-2 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-paper hover:bg-[#9d7223]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Tiếp tục làm
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lịch sử bài làm */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold text-navy-deep">
            Lịch sử bài làm
          </h2>
          {finished.length === 0 ? (
            <NoteBox className="mt-5" title="Chưa có bài làm nào">
              Hãy bắt đầu với một bài Reading để làm quen với áp lực thời gian,
              hoặc thử sức với đề Writing Task 2.{" "}
              <Link
                href="/luyen-tap"
                className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
              >
                Vào phòng luyện tập
              </Link>
              .
            </NoteBox>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] border border-line font-ui text-sm">
                <thead>
                  <tr className="bg-navy text-paper">
                    <th className="px-4 py-3 text-left font-semibold">Bài tập</th>
                    <th className="px-4 py-3 text-left font-semibold">Kỹ năng</th>
                    <th className="px-4 py-3 text-left font-semibold">Nộp lúc</th>
                    <th className="px-4 py-3 text-center font-semibold">Kết quả</th>
                    <th className="px-4 py-3 text-right font-semibold">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {finished.map((a) => (
                    <tr key={a.id} className="bg-paper transition-colors hover:bg-cream">
                      <td className="max-w-[280px] truncate px-4 py-3 font-semibold text-ink">
                        {a.exercise.title}
                      </td>
                      <td className="px-4 py-3 text-ink-soft">
                        {a.exercise.skill === "READING" ? "Reading" : "Writing"}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-ink-soft">
                        {fmt(a.submittedAt)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {a.exercise.skill === "READING" ? (
                          <span className="font-semibold tabular-nums text-navy-deep">
                            {a.scoreRaw}/{a.scoreTotal}
                          </span>
                        ) : a.status === "GRADED" && a.band != null ? (
                          <span className="border border-gold bg-gold-pale px-2 py-0.5 font-bold text-navy-deep">
                            {a.band.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-gold">Chờ chấm</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/hoc-vien/bai-lam/${a.id}`}
                          className="inline-flex items-center gap-1 font-semibold text-navy hover:text-gold"
                        >
                          Xem
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/luyen-tap/reading" variant="primary">
            Luyện Reading
          </ButtonLink>
          <ButtonLink href="/luyen-tap/writing" variant="outline">
            Luyện Writing
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
