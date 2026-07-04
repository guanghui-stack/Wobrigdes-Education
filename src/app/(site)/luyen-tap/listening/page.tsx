import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { PageHero, NoteBox, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Luyện tập Listening",
  description:
    "Gợi ý chủ đề và phương pháp luyện IELTS Listening theo Section 1–4 từ đội ngũ học thuật Wobridges.",
};

const SECTIONS = [
  {
    name: "Section 1 · Hội thoại đời sống",
    topics: [
      "Đặt phòng khách sạn, thuê nhà, đăng ký thẻ thành viên",
      "Hỏi thông tin khóa học, sự kiện, chuyến du lịch",
      "Khai báo thông tin cá nhân: tên riêng, số điện thoại, địa chỉ",
    ],
    tip: "Luyện nghe số, tên riêng được đánh vần và ngày tháng — 70% đáp án Section 1 thuộc nhóm này.",
  },
  {
    name: "Section 2 · Độc thoại đời sống",
    topics: [
      "Giới thiệu tiện ích: thư viện, bảo tàng, khu thể thao",
      "Hướng dẫn tham quan kèm bản đồ (dạng map labelling)",
      "Thông báo thay đổi lịch trình, quy định mới",
    ],
    tip: "Với dạng bản đồ, xác định điểm bắt đầu và các mốc (landmark) trước khi audio chạy.",
  },
  {
    name: "Section 3 · Thảo luận học thuật",
    topics: [
      "Sinh viên trao đổi về bài tập nhóm, đề tài nghiên cứu",
      "Trao đổi với giảng viên về phương pháp và tài liệu",
      "So sánh quan điểm — dạng matching và multiple choice",
    ],
    tip: "Chú ý các tín hiệu đổi ý: actually, but, on second thought — đáp án thường nằm sau chúng.",
  },
  {
    name: "Section 4 · Bài giảng học thuật",
    topics: [
      "Môi trường: biến đổi khí hậu, loài nguy cấp, năng lượng",
      "Lịch sử – khảo cổ: phát hiện mới, nền văn minh cổ",
      "Khoa học ứng dụng: vật liệu, công nghệ, tâm lý học",
    ],
    tip: "Ghi chú theo khung có sẵn của đề — các đáp án xuất hiện đúng thứ tự câu hỏi.",
  },
];

export default function ListeningPage() {
  return (
    <>
      <PageHero
        label="Luyện tập 4 kỹ năng · Listening"
        title="Gợi ý chủ đề Listening"
        lede="Phòng luyện Listening có audio tương tác đang được xây dựng. Trong thời gian này, hãy luyện theo bộ chủ đề chọn lọc dưới đây — được sắp xếp đúng cấu trúc 4 section của bài thi."
      />
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeading label="Theo cấu trúc đề thi" title="Bốn section, bốn chiến lược" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SECTIONS.map((s) => (
            <article key={s.name} className="border border-line bg-paper p-7 shadow-card">
              <Headphones className="h-5 w-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl font-bold text-navy-deep">{s.name}</h3>
              <ul className="mt-4 space-y-2.5">
                {s.topics.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.93rem] leading-relaxed text-ink-soft">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-[0.88rem] italic leading-relaxed text-ink-soft">
                <strong className="not-italic text-gold">Chiến lược:</strong> {s.tip}
              </p>
            </article>
          ))}
        </div>
        <NoteBox className="mt-10" title="Sắp ra mắt">
          Phòng luyện Listening với audio chuẩn giọng Anh – Úc – Mỹ, transcript
          tương tác và chấm điểm tự động sẽ được mở trong giai đoạn tiếp theo
          của nền tảng.
        </NoteBox>
      </section>
    </>
  );
}
