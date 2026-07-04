"use client";

import { useActionState } from "react";
import { ClipboardCheck } from "lucide-react";
import { gradeAttemptAction, type AdminFormState } from "@/lib/actions/admin";
import { ErrorBanner, SubmitButton } from "@/components/ui";

export function GradeForm({
  attemptId,
  initialBand,
  initialFeedback,
}: {
  attemptId: string;
  initialBand?: number | null;
  initialFeedback?: string | null;
}) {
  const action = gradeAttemptAction.bind(null, attemptId);
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="space-y-5">
      <ErrorBanner message={state?.error} />
      <div>
        <label
          htmlFor="band"
          className="block font-ui text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink"
        >
          Band điểm (0–9, bước 0.5)
          <span className="ml-1 text-danger" aria-hidden="true">*</span>
        </label>
        <input
          id="band"
          name="band"
          type="number"
          min={0}
          max={9}
          step={0.5}
          required
          defaultValue={initialBand ?? undefined}
          placeholder="6.5"
          className="mt-2 w-40 border border-line-strong bg-paper px-4 py-3 font-ui text-lg font-bold tabular-nums text-navy-deep focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
        />
      </div>
      <div>
        <label
          htmlFor="feedback"
          className="block font-ui text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink"
        >
          Nhận xét chi tiết
          <span className="ml-1 text-danger" aria-hidden="true">*</span>
        </label>
        <textarea
          id="feedback"
          name="feedback"
          required
          rows={10}
          defaultValue={initialFeedback ?? undefined}
          placeholder={
            "Gợi ý cấu trúc nhận xét theo rubric:\n• Task Response: …\n• Coherence & Cohesion: …\n• Lexical Resource: …\n• Grammatical Range & Accuracy: …\n• Ưu tiên cải thiện: …"
          }
          className="mt-2 w-full resize-y border border-line-strong bg-paper px-4 py-3 font-ui text-[0.95rem] leading-relaxed text-ink placeholder:text-muted focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
        />
        <p className="mt-1.5 font-ui text-xs text-muted">
          Học viên sẽ thấy nguyên văn nhận xét này trong hồ sơ học tập.
        </p>
      </div>
      <SubmitButton disabled={pending} variant="gold">
        <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
        {pending ? "Đang lưu…" : "Lưu điểm & trả bài"}
      </SubmitButton>
    </form>
  );
}
