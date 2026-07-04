import Link from "next/link";
import { PenLine, ArrowRight, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "Chấm bài Writing" };

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default async function GradingQueuePage() {
  await requireAdmin();

  const [pending, graded] = await Promise.all([
    db.attempt.findMany({
      where: { status: "SUBMITTED" },
      include: { user: true, exercise: true },
      orderBy: { submittedAt: "asc" },
    }),
    db.attempt.findMany({
      where: { status: "GRADED", exercise: { skill: "WRITING" } },
      include: { user: true, exercise: true },
      orderBy: { gradedAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="label-caps">Chấm bài</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">
        Hàng chờ chấm Writing
      </h1>
      <div className="rule-gold mt-5" />

      {pending.length === 0 ? (
        <p className="mt-10 border border-line bg-paper p-8 text-center text-ink-soft">
          Không còn bài nào trong hàng chờ. Tuyệt vời!
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {pending.map((a, i) => (
            <li key={a.id}>
              <Link
                href={`/quan-tri/cham-bai/${a.id}`}
                className="group flex items-center justify-between gap-4 border border-line bg-paper p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="flex items-start gap-4">
                  <span className="font-ui text-sm font-bold tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-navy-deep">
                      {a.user.name}
                      <span className="ml-2 font-ui text-sm font-normal text-muted">
                        {a.user.email}
                      </span>
                    </p>
                    <p className="mt-1 flex items-center gap-2 font-ui text-sm text-ink-soft">
                      <PenLine className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      {a.exercise.title}
                    </p>
                    <p className="mt-1 font-ui text-xs text-muted">
                      Nộp lúc {fmt(a.submittedAt)}
                      {a.autoSubmitted && " · tự nộp khi hết giờ"}
                    </p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-2 border border-navy px-5 py-2 font-ui text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-navy transition-colors group-hover:bg-navy group-hover:text-paper">
                  Chấm bài
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-14 font-display text-2xl font-bold text-navy-deep">
        Đã chấm gần đây
      </h2>
      {graded.length === 0 ? (
        <p className="mt-4 text-ink-soft">Chưa có bài nào được chấm.</p>
      ) : (
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {graded.map((a) => (
            <li key={a.id}>
              <Link
                href={`/quan-tri/cham-bai/${a.id}`}
                className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-paper md:px-3"
              >
                <p className="font-ui text-sm text-ink">
                  <CheckCircle2
                    className="mr-2 inline h-4 w-4 text-success"
                    aria-hidden="true"
                  />
                  <strong>{a.user.name}</strong> · {a.exercise.title}
                </p>
                <span className="shrink-0 border border-gold bg-gold-pale px-2.5 py-0.5 font-ui text-sm font-bold text-navy-deep">
                  {a.band?.toFixed(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
