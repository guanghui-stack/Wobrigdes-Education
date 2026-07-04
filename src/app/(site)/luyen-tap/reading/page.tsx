import type { Metadata } from "next";
import { PageHero, NoteBox } from "@/components/ui";
import { ExerciseList } from "@/components/exercise-list";

export const metadata: Metadata = {
  title: "Luyện tập Reading",
  description:
    "Phòng luyện IELTS Reading của Wobridges — passage học thuật chuẩn format, đồng hồ đếm ngược và chấm điểm tự động ngay khi nộp.",
};

export default function ReadingPage() {
  return (
    <>
      <PageHero
        label="Luyện tập 4 kỹ năng · Reading"
        title="Phòng luyện Reading"
        lede="Mỗi bài gồm một passage học thuật với đầy đủ dạng câu hỏi thi thật. Đồng hồ bắt đầu chạy ngay khi bạn mở đề — hết giờ, bài tự động nộp và được chấm ngay lập tức."
      />
      <section className="mx-auto max-w-5xl px-6 py-14">
        <ExerciseList skill="READING" />
        <NoteBox className="mt-10" title="Mẹo làm bài">
          Đọc câu hỏi trước khi đọc passage để biết cần tìm gì. Với dạng
          TRUE/FALSE/NOT GIVEN, hãy bám sát nghĩa đen của câu — đừng suy diễn từ
          kiến thức bên ngoài. Phân bổ tối đa 20 phút cho mỗi passage.
        </NoteBox>
      </section>
    </>
  );
}
