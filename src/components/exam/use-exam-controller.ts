"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { saveProgressAction, submitAttemptAction } from "@/lib/actions/attempts";

/**
 * Bộ điều khiển chung cho mọi phòng thi: nộp bài (tay/tự động khi hết giờ),
 * autosave mỗi 20 giây, trạng thái đang nộp.
 */
export function useExamController(
  attemptId: string,
  getAnswersJson: () => string
) {
  // Chế độ xem thử giao diện (trang /xem-thu-cbt ở dev): không gọi server
  const disabled = attemptId.startsWith("demo-");

  const [isSubmitting, startSubmit] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const submittedRef = useRef(false);

  const submit = useCallback(
    (auto: boolean) => {
      if (submittedRef.current || disabled) return;
      submittedRef.current = true;
      startSubmit(async () => {
        await submitAttemptAction(attemptId, getAnswersJson(), auto);
      });
    },
    [attemptId, getAnswersJson, disabled]
  );

  // Autosave mỗi 20 giây
  useEffect(() => {
    if (disabled) return;
    const id = setInterval(async () => {
      if (submittedRef.current) return;
      const res = await saveProgressAction(attemptId, getAnswersJson());
      if (res.ok) setSavedAt(new Date());
    }, 20_000);
    return () => clearInterval(id);
  }, [attemptId, getAnswersJson, disabled]);

  return { submit, isSubmitting, savedAt };
}
