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

export type ReadingContent = {
  passage: { title: string; paragraphs: string[] };
  questionGroups: ReadingQuestionGroup[];
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

export type ReadingAnswers = Record<string, string>;
export type WritingAnswers = { essay: string; wordCount: number };

/** Loại bỏ đáp án trước khi gửi đề sang trình duyệt học viên. */
export function sanitizeReadingContent(content: ReadingContent): ReadingContent {
  return {
    passage: content.passage,
    questionGroups: content.questionGroups.map((g) => ({
      type: g.type,
      instruction: g.instruction,
      questions: g.questions.map(({ id, prompt, options }) => ({
        id,
        prompt,
        options,
      })),
    })),
  };
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
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

export function gradeReading(
  content: ReadingContent,
  answers: ReadingAnswers
): { scoreRaw: number; scoreTotal: number; detail: GradedQuestion[] } {
  const detail: GradedQuestion[] = [];
  for (const group of content.questionGroups) {
    for (const q of group.questions) {
      const userAnswer = (answers[q.id] ?? "").toString();
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
        userAnswer,
        correctAnswer: q.answer ?? "",
        correct,
      });
    }
  }
  return {
    scoreRaw: detail.filter((d) => d.correct).length,
    scoreTotal: detail.length,
    detail,
  };
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
