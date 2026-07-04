import type { Metadata } from "next";
import { Mic } from "lucide-react";
import { PageHero, NoteBox, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Luyện tập Speaking",
  description:
    "Bộ chủ đề IELTS Speaking Part 1–3 cập nhật theo quý, kèm gợi ý ý tưởng và từ vựng ghi điểm từ Wobridges.",
};

const PARTS = [
  {
    name: "Part 1 · Hỏi đáp quen thuộc",
    time: "4–5 phút",
    topics: [
      "Work & Study — thói quen làm việc, môn học yêu thích",
      "Hometown — thay đổi của quê hương, nơi bạn muốn sống",
      "Daily routine — buổi sáng của bạn, cách quản lý thời gian",
      "Technology — ứng dụng dùng nhiều nhất, mạng xã hội",
    ],
    tip: "Trả lời 2–3 câu: ý chính + lý do hoặc ví dụ. Tránh trả lời một từ, cũng đừng độc thoại quá dài.",
  },
  {
    name: "Part 2 · Độc thoại 2 phút",
    time: "3–4 phút (1 phút chuẩn bị)",
    topics: [
      "Describe a person who inspired you to learn something",
      "Describe a place you visited that changed your view",
      "Describe a skill that took you a long time to master",
      "Describe an important decision you made",
    ],
    tip: "Dùng 1 phút chuẩn bị để ghi 4 từ khóa theo cue card. Kể theo mạch chuyện thật — giám khảo chấm ngôn ngữ, không chấm sự thật.",
  },
  {
    name: "Part 3 · Thảo luận mở rộng",
    time: "4–5 phút",
    topics: [
      "Vai trò của giáo dục trong xã hội hiện đại",
      "Ảnh hưởng của công nghệ đến cách con người giao tiếp",
      "Toàn cầu hóa và bản sắc văn hóa địa phương",
      "Kỹ năng nào quan trọng nhất với người trẻ hiện nay?",
    ],
    tip: "Dùng khung Ý kiến → Lý do → Ví dụ → Nhượng bộ (mặt khác…). Part 3 quyết định band 7+ của bạn.",
  },
];

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        label="Luyện tập 4 kỹ năng · Speaking"
        title="Gợi ý chủ đề Speaking"
        lede="Bộ chủ đề dưới đây được tổng hợp từ các kỳ thi gần nhất và cập nhật theo quý. Phòng luyện Speaking có ghi âm và nhận xét từ giáo viên đang được xây dựng."
      />
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeading label="Bộ đề quý III/2026" title="Ba phần thi, ba chiến lược" />
        <div className="mt-10 space-y-6">
          {PARTS.map((p) => (
            <article key={p.name} className="border border-line bg-paper p-7 shadow-card md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-gold" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-navy-deep">{p.name}</h3>
                </div>
                <span className="border border-line bg-cream px-3 py-1 font-ui text-xs font-semibold text-ink-soft">
                  {p.time}
                </span>
              </div>
              <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                {p.topics.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.93rem] leading-relaxed text-ink-soft">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-[0.88rem] italic leading-relaxed text-ink-soft">
                <strong className="not-italic text-gold">Chiến lược:</strong> {p.tip}
              </p>
            </article>
          ))}
        </div>
        <NoteBox className="mt-10" title="Luyện cùng giáo viên">
          Học viên khóa Intensive được phỏng vấn Speaking mô phỏng hằng tháng với
          giáo viên. Nếu bạn muốn được đánh giá trình độ Speaking hiện tại, hãy
          đặt lịch kiểm tra đầu vào miễn phí.
        </NoteBox>
      </section>
    </>
  );
}
