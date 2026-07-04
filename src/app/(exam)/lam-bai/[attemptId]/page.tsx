import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import {
  sanitizeReadingContent,
  type ReadingContent,
  type WritingContent,
} from "@/lib/exercise-content";
import { ReadingExam, WritingExam } from "@/components/exam/exam-room";

export const metadata = { title: "Phòng làm bài" };

export default async function ExamPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const user = await requireUser();

  const attempt = await db.attempt.findUnique({
    where: { id: attemptId },
    include: { exercise: true },
  });
  if (!attempt || attempt.userId !== user.id) redirect("/hoc-vien");
  if (attempt.status !== "IN_PROGRESS") redirect(`/hoc-vien/bai-lam/${attempt.id}`);

  const props = {
    attemptId: attempt.id,
    title: attempt.exercise.title,
    deadlineIso: attempt.deadlineAt.toISOString(),
    initialAnswers: attempt.answers,
  };

  if (attempt.exercise.skill === "READING") {
    const content = JSON.parse(attempt.exercise.content) as ReadingContent;
    return <ReadingExam {...props} content={sanitizeReadingContent(content)} />;
  }

  if (attempt.exercise.skill === "WRITING") {
    const content = JSON.parse(attempt.exercise.content) as WritingContent;
    return <WritingExam {...props} content={content} />;
  }

  redirect("/luyen-tap");
}
