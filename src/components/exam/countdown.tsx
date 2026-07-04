"use client";

import { useEffect, useRef, useState } from "react";
import { TimerReset } from "lucide-react";

function format(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Đồng hồ đếm ngược theo hạn chót tuyệt đối (deadline từ server) —
 * đổi tab hay tải lại trang vẫn không "hồi" thời gian.
 */
export function Countdown({
  deadlineIso,
  onExpire,
}: {
  deadlineIso: string;
  onExpire: () => void;
}) {
  const deadline = new Date(deadlineIso).getTime();
  const [left, setLeft] = useState(() => deadline - Date.now());
  const expiredRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const remaining = deadline - Date.now();
      setLeft(remaining);
      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire();
      }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [deadline, onExpire]);

  const warning = left <= 5 * 60_000;
  const critical = left <= 60_000;

  return (
    <div
      role="timer"
      aria-live={critical ? "assertive" : "off"}
      aria-label={`Thời gian còn lại ${format(left)}`}
      className={`flex items-center gap-2 border px-4 py-2 font-ui text-lg font-bold tabular-nums transition-colors ${
        critical
          ? "border-danger bg-danger text-paper"
          : warning
            ? "border-danger bg-danger-pale text-danger"
            : "border-line bg-paper text-navy-deep"
      }`}
    >
      <TimerReset className="h-5 w-5" aria-hidden="true" />
      {format(left)}
    </div>
  );
}
