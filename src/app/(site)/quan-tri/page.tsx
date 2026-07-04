import Link from "next/link";
import { Users, PenLine, BookOpen, Hourglass, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminOverviewPage() {
  await requireAdmin();

  const [studentCount, exerciseCount, pendingGrading, recentAttempts] =
    await Promise.all([
      db.user.count({ where: { role: "STUDENT" } }),
      db.exercise.count(),
      db.attempt.findMany({
        where: { status: "SUBMITTED" },
        include: { user: true, exercise: true },
        orderBy: { submittedAt: "asc" },
      }),
      db.attempt.findMany({
        where: { status: { not: "IN_PROGRESS" } },
        include: { user: true, exercise: true },
        orderBy: { submittedAt: "desc" },
        take: 8,
      }),
    ]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="label-caps">Tổng quan</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">
        Bảng điều khiển
      </h1>
      <div className="rule-gold mt-5" />

      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
        <div className="bg-paper p-6">
          <p className="label-caps flex items-center gap-2">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Học viên
          </p>
          <p className="mt-3 font-display text-4xl font-bold text-navy-deep">
            {studentCount}
          </p>
        </div>
        <div className="bg-paper p-6">
          <p className="label-caps flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Bài tập
          </p>
          <p className="mt-3 font-display text-4xl font-bold text-navy-deep">
            {exerciseCount}
          </p>
        </div>
        <div className="bg-paper p-6">
          <p className="label-caps flex items-center gap-2">
            <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />
            Bài chờ chấm
          </p>
          <p className="mt-3 font-display text-4xl font-bold text-gold">
            {pendingGrading.length}
          </p>
        </div>
      </div>

      {/* Hàng chờ chấm */}
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-navy-deep">
            Hàng chờ chấm Writing
          </h2>
          <Link
            href="/quan-tri/cham-bai"
            className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-navy hover:text-gold"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        {pendingGrading.length === 0 ? (
          <p className="mt-5 border border-line bg-paper p-6 text-ink-soft">
            Không có bài nào đang chờ — mọi bài viết đã được chấm xong.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {pendingGrading.slice(0, 5).map((a) => (
              <li key={a.id}>
                <Link
                  href={`/quan-tri/cham-bai/${a.id}`}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-paper md:px-3"
                >
                  <div className="flex items-center gap-3">
                    <PenLine className="h-4 w-4 text-gold" aria-hidden="true" />
                    <div>
                      <p className="font-ui font-semibold text-ink">
                        {a.user.name}
                        <span className="ml-2 font-normal text-muted">
                          · {a.exercise.title}
                        </span>
                      </p>
                      <p className="mt-0.5 font-ui text-xs text-muted">
                        Nộp lúc {fmt(a.submittedAt)}
                        {a.autoSubmitted && " · tự nộp khi hết giờ"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 text-line-strong group-hover:text-gold"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hoạt động gần đây */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-navy-deep">
          Bài nộp gần đây
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] border border-line font-ui text-sm">
            <thead>
              <tr className="bg-navy text-paper">
                <th className="px-4 py-3 text-left font-semibold">Học viên</th>
                <th className="px-4 py-3 text-left font-semibold">Bài tập</th>
                <th className="px-4 py-3 text-left font-semibold">Nộp lúc</th>
                <th className="px-4 py-3 text-center font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {recentAttempts.map((a) => (
                <tr key={a.id} className="bg-paper">
                  <td className="px-4 py-3 font-semibold text-ink">{a.user.name}</td>
                  <td className="max-w-[280px] truncate px-4 py-3 text-ink-soft">
                    {a.exercise.title}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-ink-soft">
                    {fmt(a.submittedAt)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {a.status === "GRADED" ? (
                      a.exercise.skill === "READING" ? (
                        <span className="tabular-nums text-success">
                          {a.scoreRaw}/{a.scoreTotal}
                        </span>
                      ) : (
                        <span className="text-success">
                          Band {a.band?.toFixed(1) ?? "—"}
                        </span>
                      )
                    ) : (
                      <span className="text-gold">Chờ chấm</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
