import { BarChart3 } from "lucide-react";

export type WeeklyRow = {
  label: string; // dd/mm/yyyy
  r: number;
  l: number;
  w: number;
  s: number;
  minutes: number;
};

function cell(n: number) {
  return n > 0 ? n : "–";
}

function fmtMinutes(m: number) {
  if (m <= 0) return "0p";
  if (m < 60) return `${m}p`;
  return `${Math.floor(m / 60)}g ${m % 60}p`;
}

/** Bảng thống kê số bài đã nộp trong 7 ngày gần nhất, chia theo kỹ năng. */
export function WeeklyStats({ rows }: { rows: WeeklyRow[] }) {
  const total = rows.reduce(
    (acc, r) => ({
      r: acc.r + r.r,
      l: acc.l + r.l,
      w: acc.w + r.w,
      s: acc.s + r.s,
      minutes: acc.minutes + r.minutes,
    }),
    { r: 0, l: 0, w: 0, s: 0, minutes: 0 }
  );

  return (
    <div className="border border-line bg-paper p-7 shadow-card">
      <p className="label-caps flex items-center gap-2">
        <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
        Bài đã làm trong 7 ngày
      </p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[380px] border border-line font-ui text-sm">
          <thead>
            <tr className="bg-navy text-paper">
              <th className="px-3 py-2.5 text-left font-semibold">Ngày</th>
              <th className="w-12 px-2 py-2.5 text-center font-semibold" title="Reading">R</th>
              <th className="w-12 px-2 py-2.5 text-center font-semibold" title="Listening">L</th>
              <th className="w-12 px-2 py-2.5 text-center font-semibold" title="Writing">W</th>
              <th className="w-12 px-2 py-2.5 text-center font-semibold" title="Speaking">S</th>
              <th className="px-3 py-2.5 text-right font-semibold">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.label} className="bg-paper">
                <td className="px-3 py-2.5 tabular-nums text-ink">{row.label}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-ink-soft">{cell(row.r)}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-ink-soft">{cell(row.l)}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-ink-soft">{cell(row.w)}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-ink-soft">{cell(row.s)}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-ink-soft">
                  {fmtMinutes(row.minutes)}
                </td>
              </tr>
            ))}
            <tr className="bg-cream-deep font-semibold text-ink">
              <td className="px-3 py-2.5">Tổng cộng</td>
              <td className="px-2 py-2.5 text-center tabular-nums">{total.r}</td>
              <td className="px-2 py-2.5 text-center tabular-nums">{total.l}</td>
              <td className="px-2 py-2.5 text-center tabular-nums">{total.w}</td>
              <td className="px-2 py-2.5 text-center tabular-nums">{total.s}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">
                {fmtMinutes(total.minutes)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-ui text-xs leading-relaxed text-muted">
        Thời gian tính theo lúc bắt đầu đến lúc nộp từng bài. Listening và
        Speaking sẽ được thống kê khi phòng luyện hai kỹ năng này ra mắt.
      </p>
    </div>
  );
}
