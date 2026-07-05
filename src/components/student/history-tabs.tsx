"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  ArrowRight,
  History,
} from "lucide-react";

export type HistoryItem = {
  id: string;
  title: string;
  skill: "READING" | "LISTENING" | "WRITING" | "SPEAKING";
  submittedAtLabel: string;
  resultKind: "score" | "band" | "pending";
  resultLabel: string;
  href: string;
};

const TABS = [
  { key: "WRITING", label: "Writing", icon: PenLine },
  { key: "SPEAKING", label: "Speaking", icon: Mic },
  { key: "READING", label: "Reading", icon: BookOpen },
  { key: "LISTENING", label: "Listening", icon: Headphones },
] as const;

const COMING_SOON = new Set(["SPEAKING", "LISTENING"]);

/** Lịch sử làm bài chia theo tab kỹ năng. */
export function HistoryTabs({ items }: { items: HistoryItem[] }) {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("WRITING");
  const filtered = items.filter((i) => i.skill === active);

  return (
    <div className="border border-line bg-paper p-7 shadow-card">
      <p className="label-caps flex items-center gap-2">
        <History className="h-3.5 w-3.5" aria-hidden="true" />
        Lịch sử làm bài
      </p>

      <div
        role="tablist"
        aria-label="Lọc lịch sử theo kỹ năng"
        className="mt-5 flex flex-wrap gap-1 border-b border-line"
      >
        {TABS.map((t) => {
          const isActive = active === t.key;
          const count = items.filter((i) => i.skill === t.key).length;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2.5 font-ui text-[0.8rem] font-semibold uppercase tracking-[0.08em] transition-colors ${
                isActive
                  ? "border-gold text-gold"
                  : "border-transparent text-ink-soft hover:text-navy"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {t.label}
              {count > 0 && (
                <span className="tabular-nums text-xs font-normal">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 border border-line bg-cream px-5 py-6 text-center font-ui text-sm text-ink-soft">
          {COMING_SOON.has(active)
            ? "Phòng luyện kỹ năng này đang được xây dựng — hiện chưa có bài làm để hiển thị."
            : "Bạn chưa nộp bài nào ở kỹ năng này. Vào phòng luyện tập để bắt đầu!"}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] font-ui text-sm">
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th className="py-2.5 pr-4 font-ui text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  Bài tập
                </th>
                <th className="py-2.5 pr-4 font-ui text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  Nộp lúc
                </th>
                <th className="py-2.5 pr-4 text-center font-ui text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  Kết quả
                </th>
                <th className="py-2.5 text-right font-ui text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-cream">
                  <td className="max-w-[300px] truncate py-3 pr-4 font-semibold text-ink">
                    {item.title}
                  </td>
                  <td className="py-3 pr-4 tabular-nums text-ink-soft">
                    {item.submittedAtLabel}
                  </td>
                  <td className="py-3 pr-4 text-center">
                    {item.resultKind === "band" ? (
                      <span className="border border-gold bg-gold-pale px-2 py-0.5 font-bold text-navy-deep">
                        {item.resultLabel}
                      </span>
                    ) : item.resultKind === "pending" ? (
                      <span className="text-gold">{item.resultLabel}</span>
                    ) : (
                      <span className="font-semibold tabular-nums text-navy-deep">
                        {item.resultLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={item.href}
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
  );
}
