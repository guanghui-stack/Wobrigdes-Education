/**
 * Định nghĩa cấu trúc JSON của nội dung bài tập + chấm điểm Reading.
 * Dùng chung cho server (chấm bài, seed) và client (render đề).
 */

export type ReadingQuestion = {
  id: string;
  prompt: string;
  options?: string[]; // TFNG/MC
  answer?: string; // chỉ tồn tại phía server
  altAnswers?: string[];
};

export type ReadingQuestionGroup = {
  type: "TFNG" | "MC" | "GAP";
  instruction: string;
  questions: ReadingQuestion[];
};

export type ReadingPassage = { title: string; paragraphs: string[] };

/** Một part của bài thi (giống Part 1/2/3 trong đề thật). */
export type ReadingPart = {
  passage: ReadingPassage;
  questionGroups: ReadingQuestionGroup[];
};

/**
 * Nội dung đề Reading — hỗ trợ 2 dạng:
 *  - Dạng mới:  { parts: [{passage, questionGroups}, …] } (1–3 part)
 *  - Dạng cũ:   { passage, questionGroups } (1 passage — các đề đã tạo trước)
 */
export type ReadingContent = {
  parts?: ReadingPart[];
  passage?: ReadingPassage;
  questionGroups?: ReadingQuestionGroup[];
};

export type WritingContent = {
  task: "TASK_1" | "TASK_2";
  prompt: string;
  minWords: number;
  guidance?: string;
  dataTable?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
};

/**
 * Đáp án Reading: qid → giá trị. Khóa đặc biệt "__marked" lưu danh sách
 * câu học viên đánh dấu xem lại (không tham gia chấm điểm).
 */
export type ReadingAnswers = Record<string, string | string[]>;
export type WritingAnswers = { essay: string; wordCount: number };

/** Quy mọi đề Reading về dạng parts[] thống nhất. */
export function normalizeReadingParts(content: ReadingContent): ReadingPart[] {
  if (content.parts && content.parts.length > 0) return content.parts;
  if (content.passage && content.questionGroups) {
    return [{ passage: content.passage, questionGroups: content.questionGroups }];
  }
  return [];
}

/** Loại bỏ đáp án trước khi gửi đề sang trình duyệt học viên. */
export function sanitizeReadingParts(content: ReadingContent): ReadingPart[] {
  return normalizeReadingParts(content).map((part) => ({
    passage: part.passage,
    questionGroups: part.questionGroups.map((g) => ({
      type: g.type,
      instruction: g.instruction,
      questions: g.questions.map(({ id, prompt, options }) => ({
        id,
        prompt,
        options,
      })),
    })),
  }));
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.,;:!?'"()]/g, "")
    .replace(/\s+/g, " ");
}

/** So khớp đáp án GAP: chấp nhận đáp án chính và các biến thể. */
function gapMatches(userAnswer: string, q: ReadingQuestion): boolean {
  const user = normalize(userAnswer);
  if (!user) return false;
  const accepted = [q.answer ?? "", ...(q.altAnswers ?? [])].map(normalize);
  return accepted.includes(user);
}

export type GradedQuestion = {
  id: string;
  prompt: string;
  type: ReadingQuestionGroup["type"];
  part: number; // 1-based
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

export function gradeReading(
  content: ReadingContent,
  answers: ReadingAnswers
): { scoreRaw: number; scoreTotal: number; detail: GradedQuestion[] } {
  const detail: GradedQuestion[] = [];
  const parts = normalizeReadingParts(content);
  parts.forEach((part, partIdx) => {
    for (const group of part.questionGroups) {
      for (const q of group.questions) {
        const raw = answers[q.id];
        const userAnswer = typeof raw === "string" ? raw : "";
        let correct = false;
        if (group.type === "GAP") {
          correct = gapMatches(userAnswer, q);
        } else if (group.type === "MC") {
          // Đáp án MC lưu dạng chữ cái ("B"); lựa chọn dạng "B. Nội dung…"
          const letter = userAnswer.trim().charAt(0).toUpperCase();
          correct = letter === (q.answer ?? "").trim().charAt(0).toUpperCase();
        } else {
          correct = normalize(userAnswer) === normalize(q.answer ?? "");
        }
        detail.push({
          id: q.id,
          prompt: q.prompt,
          type: group.type,
          part: partIdx + 1,
          userAnswer,
          correctAnswer: q.answer ?? "",
          correct,
        });
      }
    }
  });
  return {
    scoreRaw: detail.filter((d) => d.correct).length,
    scoreTotal: detail.length,
    detail,
  };
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
