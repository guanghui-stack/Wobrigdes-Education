import type { Metadata } from "next";
import {
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  MonitorPlay,
  MessagesSquare,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero, SectionHeading, NoteBox, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Khoá E-learning lẻ",
  description:
    "Các khoá E-learning lẻ theo từng kỹ năng IELTS — học linh hoạt theo tiến độ riêng, có giáo viên đồng hành chấm chữa, phù hợp người bận rộn.",
};

const COURSES = [
  {
    icon: BookOpen,
    title: "Reading Mastery",
    price: "1.490.000₫",
    length: "8 tuần · 24 video bài giảng",
    points: [
      "Chiến lược xử lý 12 dạng câu hỏi",
      "Kỹ thuật skimming – scanning theo đoạn",
      "10 đề luyện có giải thích đáp án chi tiết",
    ],
  },
  {
    icon: Headphones,
    title: "Listening Precision",
    price: "1.490.000₫",
    length: "8 tuần · 22 video bài giảng",
    points: [
      "Luyện nghe chép chính tả có phương pháp",
      "Dự đoán đáp án qua từ khóa & ngữ điệu",
      "Bộ đề Section 1–4 chuẩn độ khó thi thật",
    ],
  },
  {
    icon: PenLine,
    title: "Writing Architect",
    price: "2.190.000₫",
    length: "10 tuần · 26 video + 8 bài chấm chữa",
    points: [
      "Khung triển khai ý cho mọi dạng Task 2",
      "Task 1: ngôn ngữ mô tả số liệu chính xác",
      "8 bài viết được giáo viên chấm bằng rubric",
    ],
  },
  {
    icon: Mic,
    title: "Speaking Fluency",
    price: "2.190.000₫",
    length: "10 tuần · 24 video + 4 buổi 1-1",
    points: [
      "Bộ ý tưởng & từ vựng theo chủ đề quý",
      "Luyện phát âm trọng âm – nối âm – ngữ điệu",
      "4 buổi phỏng vấn mô phỏng cùng giáo viên",
    ],
  },
];

const STEPS = [
  {
    icon: MonitorPlay,
    title: "Học theo tiến độ riêng",
    desc: "Video bài giảng mở khóa theo tuần, xem lại không giới hạn trong 12 tháng.",
  },
  {
    icon: MessagesSquare,
    title: "Giáo viên đồng hành",
    desc: "Nhóm hỗ trợ riêng cho từng khoá — mọi thắc mắc được giải đáp trong 24 giờ.",
  },
  {
    icon: BadgeCheck,
    title: "Luyện tập tích hợp",
    desc: "Bài tập trên nền tảng wobridges.vn đồng bộ với nội dung từng tuần học.",
  },
];

export default function ELearningPage() {
  return (
    <>
      <PageHero
        label="Học linh hoạt"
        title="Khoá E-learning lẻ theo kỹ năng"
        lede="Chỉ cần cải thiện một kỹ năng? Chọn đúng khoá bạn cần — học mọi lúc theo tiến độ riêng, nhưng không đơn độc: luôn có giáo viên chấm chữa và đồng hành."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Chọn kỹ năng" title="Bốn khoá học, mua lẻ từng kỹ năng" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {COURSES.map((c) => (
            <article key={c.title} className="flex flex-col border border-line bg-paper p-8 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <c.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-navy-deep">
                    {c.title}
                  </h3>
                  <p className="mt-1 font-ui text-sm text-muted">{c.length}</p>
                </div>
                <p className="shrink-0 font-display text-xl font-bold text-gold">{c.price}</p>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/dang-ky" variant="outline" className="mt-7 self-start">
                Đăng ký khoá này
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading label="Cách vận hành" title="Online nhưng không một mình" align="center" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.title} className="text-center">
                <s.icon className="mx-auto h-7 w-7 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-deep">
                  {s.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <NoteBox className="mx-auto mt-14 max-w-3xl" title="Ghi danh">
            Sau khi đăng ký, trung tâm sẽ liên hệ xác nhận và kích hoạt khoá học
            trong vòng 24 giờ làm việc. Học viên khoá E-learning được sử dụng
            toàn bộ phòng luyện tập 4 kỹ năng trên nền tảng này miễn phí.
          </NoteBox>
        </div>
      </section>
    </>
  );
}
