import type { Metadata } from "next";
import {
  CalendarClock,
  Users,
  Target,
  FileSignature,
  Check,
  ArrowRight,
} from "lucide-react";
import { PageHero, SectionHeading, NoteBox, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Khóa học Intensive 7.0",
  description:
    "Khóa IELTS Intensive cam kết đầu ra 7.0 trong 6 tháng — lớp tối đa 8 học viên, chấm chữa Writing & Speaking hằng tuần, hợp đồng cam kết rõ ràng.",
};

const STAGES = [
  {
    no: "Giai đoạn 1",
    range: "Tuần 1–8",
    title: "Nền tảng học thuật",
    desc: "Củng cố ngữ pháp học thuật, xây kho từ vựng theo chủ đề thi, làm quen toàn bộ dạng câu hỏi của 4 kỹ năng. Kiểm tra tiến độ 2 tuần/lần.",
    outcomes: ["Nắm chắc 12 dạng câu hỏi Reading & Listening", "Viết đúng cấu trúc đoạn văn học thuật", "Phát âm chuẩn IPA, phản xạ Part 1"],
  },
  {
    no: "Giai đoạn 2",
    range: "Tuần 9–16",
    title: "Chiến lược từng kỹ năng",
    desc: "Đi sâu chiến lược xử lý từng dạng bài: quản lý thời gian Reading, dự đoán đáp án Listening, phát triển ý Writing Task 2, mở rộng câu trả lời Speaking Part 3.",
    outcomes: ["Hoàn thành Reading trong 55 phút", "Task 2 đủ 4 tiêu chí band 6.5+", "Speaking Part 2 nói trọn 2 phút"],
  },
  {
    no: "Giai đoạn 3",
    range: "Tuần 17–24",
    title: "Luyện đề cường độ cao",
    desc: "Mỗi tuần 2 bài thi thử full 4 kỹ năng trong điều kiện phòng thi. Giáo viên chấm chữa 1-1, phân tích lỗi lặp lại và tinh chỉnh chiến lược cá nhân.",
    outcomes: ["8 bài thi thử full-test có band điểm", "Writing được chấm chữa tối thiểu 16 bài", "Phỏng vấn Speaking mô phỏng với giám khảo"],
  },
];

const INCLUDED = [
  "Kiểm tra đầu vào & tư vấn lộ trình 1-1 miễn phí",
  "Giáo trình biên soạn riêng + bộ đề cập nhật theo quý",
  "Tài khoản luyện tập online không giới hạn trên wobridges.vn",
  "Chấm chữa Writing hằng tuần bằng rubric giám khảo",
  "1 buổi mô phỏng phỏng vấn Speaking mỗi tháng",
  "Học lại miễn phí nếu chưa đạt cam kết đầu ra",
];

export default function IntensivePage() {
  return (
    <>
      <PageHero
        label="Chương trình chủ lực"
        title="Khóa học Intensive 7.0"
        lede="Lộ trình 6 tháng được thiết kế cho học viên nghiêm túc với mục tiêu IELTS 7.0 — cường độ cao, sĩ số nhỏ và cam kết đầu ra bằng hợp đồng."
      />

      {/* Thông số khóa học */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="label-caps flex items-center gap-2">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              Thời lượng
            </dt>
            <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              24 tuần · 3 buổi/tuần · 90 phút/buổi, kết hợp luyện tập online có hướng dẫn
            </dd>
          </div>
          <div>
            <dt className="label-caps flex items-center gap-2">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              Đầu vào
            </dt>
            <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              Từ band 5.0 (có bài kiểm tra xếp lớp); dưới 5.0 sẽ được tư vấn lớp nền tảng
            </dd>
          </div>
          <div>
            <dt className="label-caps flex items-center gap-2">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              Sĩ số
            </dt>
            <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              Tối đa 8 học viên/lớp để bảo đảm thời lượng chấm chữa cá nhân
            </dd>
          </div>
          <div>
            <dt className="label-caps flex items-center gap-2">
              <FileSignature className="h-3.5 w-3.5" aria-hidden="true" />
              Cam kết
            </dt>
            <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              Đầu ra 7.0 ghi trong hợp đồng · học lại miễn phí đến khi đạt
            </dd>
          </div>
        </dl>
      </section>

      {/* Lộ trình 3 giai đoạn */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading label="Lộ trình" title="Ba giai đoạn, một đích đến" />
          <div className="mt-12 space-y-0 divide-y divide-line border-y border-line">
            {STAGES.map((s) => (
              <article key={s.no} className="grid gap-6 py-10 md:grid-cols-[220px_1fr] md:gap-12">
                <header>
                  <p className="label-caps">{s.no}</p>
                  <p className="mt-1 font-ui text-sm text-muted">{s.range}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-navy-deep">
                    {s.title}
                  </h3>
                </header>
                <div>
                  <p className="leading-relaxed text-ink-soft">{s.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-[0.95rem] text-ink">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quyền lợi & học phí */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading label="Quyền lợi" title="Trọn gói, không phí ẩn" />
            <ul className="mt-8 space-y-3.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1rem] text-ink-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit border border-line bg-paper p-8 shadow-card">
            <p className="label-caps">Học phí trọn khóa</p>
            <p className="mt-4 font-display text-4xl font-bold text-navy-deep">
              18.900.000₫
            </p>
            <p className="mt-2 font-ui text-sm text-muted">
              Trả góp 3 đợt không lãi suất · giảm 5% khi đăng ký theo nhóm 2 người
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <ButtonLink href="/dang-ky" variant="gold">
                Đặt lịch kiểm tra đầu vào
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/ket-qua-hoc-vien" variant="outline">
                Xem kết quả học viên
              </ButtonLink>
            </div>
          </aside>
        </div>
        <NoteBox className="mt-14" title="Điều kiện cam kết">
          Cam kết đầu ra áp dụng khi học viên tham dự tối thiểu 90% số buổi học,
          hoàn thành đầy đủ bài tập được giao trên nền tảng và tham gia đủ các kỳ
          thi thử định kỳ. Chi tiết được ghi rõ trong hợp đồng đào tạo ký kết
          trước khai giảng.
        </NoteBox>
      </section>
    </>
  );
}
