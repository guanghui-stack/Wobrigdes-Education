import { notFound } from "next/navigation";
import { ReadingCbtExam } from "@/components/exam/reading-cbt";
import { sanitizeReadingParts } from "@/lib/exercise-content";
import seedData from "../../../../prisma/seed-data.json";
import type { ReadingContent } from "@/lib/exercise-content";

export const metadata = { title: "Xem thử phòng thi CBT" };

/**
 * Trang xem thử giao diện phòng thi CBT — CHỈ tồn tại ở môi trường dev
 * để kiểm tra UI mà không cần tạo lượt làm bài trong database.
 */
export default function CbtPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const fullTest = seedData.exercises.find(
    (e) => e.taskType === "READING_FULL"
  );
  if (!fullTest) notFound();

  return (
    <ReadingCbtExam
      attemptId="demo-preview"
      title={fullTest.title}
      deadlineIso={new Date(Date.now() + 60 * 60_000).toISOString()}
      initialAnswers="{}"
      parts={sanitizeReadingParts(fullTest.content as ReadingContent)}
    />
  );
}
