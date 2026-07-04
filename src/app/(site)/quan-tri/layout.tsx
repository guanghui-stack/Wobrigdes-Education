import Link from "next/link";
import { requireAdmin } from "@/lib/session";

const TABS = [
  { href: "/quan-tri", label: "Tổng quan" },
  { href: "/quan-tri/cham-bai", label: "Chấm bài" },
  { href: "/quan-tri/bai-tap", label: "Bài tập" },
  { href: "/quan-tri/hoc-vien", label: "Học viên" },
];

export const metadata = { title: "Quản trị" };

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  return (
    <>
      <div className="border-b border-line bg-navy-deep">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <p className="font-ui text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
            Khu vực quản trị · Wobridges
          </p>
          <nav aria-label="Quản trị" className="flex flex-wrap gap-1">
            {TABS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-1.5 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-cream/80 transition-colors hover:bg-navy hover:text-paper"
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}
