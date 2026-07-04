import type { Metadata } from "next";
import { PageHero, NoteBox } from "@/components/ui";
import { ExerciseList } from "@/components/exercise-list";

export const metadata: Metadata = {
  title: "Luyện tập Writing",
  description:
    "Phòng luyện IELTS Writing của Wobridges — viết Task 1 & Task 2 với đồng hồ đếm ngược, giáo viên chấm bằng rubric và nhận xét chi tiết.",
};

export default function WritingPage() {
  return (
    <>
      <PageHero
        label="Luyện tập 4 kỹ năng · Writing"
        title="Phòng luyện Writing"
        lede="Task 1 và Task 2 trong điều kiện thi thật: đồng hồ đếm ngược, bộ đếm từ và tự động nộp khi hết giờ. Mỗi bài nộp được giáo viên Wobridges chấm bằng rubric 4 tiêu chí trong vòng 48 giờ."
      />
      <section className="mx-auto max-w-5xl px-6 py-14">
        <ExerciseList skill="WRITING" />
        <NoteBox className="mt-10" title="Quy trình chấm">
          Sau khi nộp, bài viết vào hàng chờ chấm của giáo viên. Bạn sẽ nhận
          band điểm theo 4 tiêu chí cùng nhận xét chi tiết trong mục{" "}
          <strong>Hồ sơ học tập → Bài đã nộp</strong>. Bài tự nộp do hết giờ vẫn
          được chấm bình thường.
        </NoteBox>
      </section>
    </>
  );
}
