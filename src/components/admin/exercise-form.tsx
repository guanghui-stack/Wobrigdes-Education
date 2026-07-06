"use client";

import { useActionState, useState } from "react";
import { Save } from "lucide-react";
import {
  createExerciseAction,
  updateExerciseAction,
  type AdminFormState,
} from "@/lib/actions/admin";
import { ErrorBanner, SubmitButton } from "@/components/ui";

const READING_TEMPLATE = `{
  "parts": [
    {
      "passage": {
        "title": "Tiêu đề passage Part 1",
        "paragraphs": [
          "Đoạn văn thứ nhất…",
          "Đoạn văn thứ hai…"
        ]
      },
      "questionGroups": [
        {
          "type": "TFNG",
          "instruction": "Do the following statements agree with the information in the passage?",
          "questions": [
            {
              "id": "q1",
              "prompt": "Nội dung câu khẳng định…",
              "options": ["TRUE", "FALSE", "NOT GIVEN"],
              "answer": "TRUE"
            }
          ]
        },
        {
          "type": "MC",
          "instruction": "Choose the correct letter, A, B, C or D.",
          "questions": [
            {
              "id": "q2",
              "prompt": "Câu hỏi…",
              "options": ["A. Lựa chọn 1", "B. Lựa chọn 2", "C. Lựa chọn 3", "D. Lựa chọn 4"],
              "answer": "B"
            }
          ]
        },
        {
          "type": "GAP",
          "instruction": "Complete the sentences. Write NO MORE THAN TWO WORDS.",
          "questions": [
            {
              "id": "q3",
              "prompt": "Câu có chỗ trống ______ cần điền.",
              "answer": "đáp án",
              "altAnswers": ["biến thể chấp nhận được"]
            }
          ]
        }
      ]
    }
  ]
}`;

const inputCls =
  "mt-2 w-full border border-line-strong bg-paper px-4 py-3 font-ui text-[0.95rem] text-ink placeholder:text-muted focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelCls =
  "block font-ui text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink";

type Defaults = {
  skill?: string;
  title?: string;
  description?: string;
  durationMinutes?: number;
  published?: boolean;
  // Writing
  task?: string;
  prompt?: string;
  guidance?: string;
  minWords?: number;
  dataTable?: string;
  // Reading
  content?: string;
};

export function ExerciseForm({
  exerciseId,
  defaults,
}: {
  exerciseId?: string;
  defaults?: Defaults;
}) {
  const action = exerciseId
    ? updateExerciseAction.bind(null, exerciseId)
    : createExerciseAction;
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    action,
    undefined
  );
  const [skill, setSkill] = useState(defaults?.skill ?? "WRITING");

  return (
    <form action={formAction} className="space-y-6">
      <ErrorBanner message={state?.error} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="skill" className={labelCls}>
            Kỹ năng <span className="text-danger">*</span>
          </label>
          <select
            id="skill"
            name="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className={inputCls}
          >
            <option value="WRITING">Writing</option>
            <option value="READING">Reading</option>
          </select>
        </div>
        <div>
          <label htmlFor="durationMinutes" className={labelCls}>
            Thời gian làm bài (phút) <span className="text-danger">*</span>
          </label>
          <input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={1}
            max={240}
            required
            defaultValue={defaults?.durationMinutes ?? (skill === "READING" ? 20 : 40)}
            className={inputCls}
          />
          <p className="mt-1.5 font-ui text-xs text-muted">
            Chuẩn IELTS: Task 1 — 20&apos;, Task 2 — 40&apos;, 1 passage Reading — 20&apos;.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="title" className={labelCls}>
          Tiêu đề bài tập <span className="text-danger">*</span>
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaults?.title}
          placeholder="Ví dụ: Writing Task 2 — Technology in Education"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelCls}>
          Mô tả ngắn
        </label>
        <input
          id="description"
          name="description"
          defaultValue={defaults?.description}
          placeholder="Ví dụ: Dạng bài Agree/Disagree · tối thiểu 250 từ · 40 phút."
          className={inputCls}
        />
      </div>

      {skill === "WRITING" ? (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="task" className={labelCls}>
                Task <span className="text-danger">*</span>
              </label>
              <select
                id="task"
                name="task"
                defaultValue={defaults?.task ?? "TASK_2"}
                className={inputCls}
              >
                <option value="TASK_1">Task 1 (mô tả số liệu)</option>
                <option value="TASK_2">Task 2 (bài luận)</option>
              </select>
            </div>
            <div>
              <label htmlFor="minWords" className={labelCls}>
                Số từ tối thiểu <span className="text-danger">*</span>
              </label>
              <input
                id="minWords"
                name="minWords"
                type="number"
                min={50}
                max={1000}
                required
                defaultValue={defaults?.minWords ?? 250}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label htmlFor="prompt" className={labelCls}>
              Đề bài (tiếng Anh) <span className="text-danger">*</span>
            </label>
            <textarea
              id="prompt"
              name="prompt"
              required
              rows={5}
              defaultValue={defaults?.prompt}
              placeholder={"Some people believe that…\n\nTo what extent do you agree or disagree?"}
              className={`${inputCls} resize-y`}
            />
            <p className="mt-1.5 font-ui text-xs text-muted">
              Ngăn cách các đoạn của đề bằng một dòng trống.
            </p>
          </div>
          <div>
            <label htmlFor="guidance" className={labelCls}>
              Hướng dẫn cho học viên (tiếng Việt)
            </label>
            <textarea
              id="guidance"
              name="guidance"
              rows={2}
              defaultValue={defaults?.guidance}
              placeholder="Gợi ý cấu trúc, lưu ý thời gian…"
              className={`${inputCls} resize-y`}
            />
          </div>
          <div>
            <label htmlFor="dataTable" className={labelCls}>
              Bảng số liệu (JSON — chỉ dành cho Task 1)
            </label>
            <textarea
              id="dataTable"
              name="dataTable"
              rows={5}
              defaultValue={defaults?.dataTable}
              placeholder={`{"caption": "Tiêu đề bảng", "headers": ["Cột 1", "Cột 2"], "rows": [["a", "b"]]}`}
              className={`${inputCls} resize-y font-mono text-sm`}
            />
          </div>
        </>
      ) : (
        <div>
          <label htmlFor="content" className={labelCls}>
            Nội dung bài Reading (JSON) <span className="text-danger">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={22}
            defaultValue={defaults?.content ?? READING_TEMPLATE}
            className={`${inputCls} resize-y font-mono text-[0.82rem] leading-relaxed`}
          />
          <p className="mt-1.5 font-ui text-xs leading-relaxed text-muted">
            Đề gồm 1–3 <strong>part</strong> (thêm phần tử vào mảng
            &quot;parts&quot; để có Part 2, 3 — giống đề thi thật). Ba loại câu
            hỏi: <strong>TFNG</strong> (TRUE/FALSE/NOT GIVEN),{" "}
            <strong>MC</strong> (trắc nghiệm A–D, đáp án là chữ cái),{" "}
            <strong>GAP</strong> (điền từ — thêm &quot;altAnswers&quot; cho biến
            thể được chấp nhận). Mỗi câu cần &quot;id&quot; duy nhất trong{" "}
            <strong>toàn bộ đề</strong> (q1, q2… đánh liên tục xuyên part).
          </p>
        </div>
      )}

      <label className="flex cursor-pointer items-center gap-3 font-ui text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaults?.published ?? true}
          className="h-4 w-4 accent-[#1e3a5c]"
        />
        Mở cho học viên làm ngay sau khi lưu
      </label>

      <SubmitButton disabled={pending} variant="gold">
        <Save className="h-4 w-4" aria-hidden="true" />
        {pending ? "Đang lưu…" : exerciseId ? "Cập nhật bài tập" : "Tạo bài tập"}
      </SubmitButton>
    </form>
  );
}
