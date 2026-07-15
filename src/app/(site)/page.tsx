import Link from "next/link";
import {
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  ArrowRight,
  GraduationCap,
  Users,
  CalendarClock,
  Laptop,
} from "lucide-react";
import { SectionHeading, NoteBox, ButtonLink } from "@/components/ui";

const TOC = [
  {
    no: "01",
    href: "/khoa-hoc-ielts",
    title: "Khóa học IELTS",
    note: "Lộ trình 3 giai đoạn: Pre-IELTS → Basic → Advanced (0 → 6.5+)",
  },
  {
    no: "02",
    href: "/khoa-e-learning",
    title: "Khoá E-learning lẻ",
    note: "Học linh hoạt từng kỹ năng theo nhu cầu",
  },
  {
    no: "03",
    href: "/luyen-tap",
    title: "Luyện tập 4 kỹ năng",
    note: "Phòng luyện đề chuẩn format, chấm chữa chi tiết",
  },
  {
    no: "04",
    href: "/bai-mau-writing",
    title: "Bài mẫu Writing 8.0+",
    note: "Kho bài mẫu kèm phân tích từ vựng, cấu trúc",
  },
  {
    no: "05",
    href: "/ket-qua-hoc-vien",
    title: "Kết quả học viên",
    note: "Bảng vàng thành tích và câu chuyện học viên",
  },
];

const SKILLS = [
  {
    icon: BookOpen,
    href: "/luyen-tap/reading",
    title: "Reading",
    desc: "Đề luyện chuẩn format với đồng hồ đếm ngược và chấm điểm tự động ngay khi nộp bài.",
  },
  {
    icon: Headphones,
    href: "/luyen-tap/listening",
    title: "Listening",
    desc: "Chủ đề luyện nghe chọn lọc theo dạng bài Section 1–4, kèm chiến lược làm bài.",
  },
  {
    icon: PenLine,
    href: "/luyen-tap/writing",
    title: "Writing",
    desc: "Viết Task 1 & Task 2 trong điều kiện phòng thi — giáo viên chấm và nhận xét từng bài.",
  },
  {
    icon: Mic,
    href: "/luyen-tap/speaking",
    title: "Speaking",
    desc: "Bộ chủ đề Part 1–3 theo quý, gợi ý ý tưởng và từ vựng ghi điểm.",
  },
];

const RESULTS = [
  { name: "Nguyễn Minh Anh", band: "8.0", detail: "Overall · từ 6.0 sau 5 tháng" },
  { name: "Trần Quốc Bảo", band: "7.5", detail: "Overall · Writing 7.0" },
  { name: "Lê Thu Hà", band: "7.0", detail: "Overall · đạt mục tiêu du học Úc" },
];

export default function HomePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="label-caps">Trung tâm Anh ngữ Wobridges — World Bridges</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] text-navy-deep md:text-6xl">
              Những cây cầu nối bạn với thế giới
            </h1>
            <div className="rule-gold mt-7" />
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Wobridges đào tạo IELTS theo triết lý <strong className="text-ink">thực chiến</strong>:
              lộ trình cá nhân hóa, luyện đề đúng điều kiện phòng thi và chấm chữa
              tỉ mỉ từng bài viết — để mỗi buổi học là một nhịp cầu đưa bạn đến
              gần hơn với mục tiêu của mình.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/khoa-hoc-ielts" variant="primary">
                Khóa học IELTS
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/luyen-tap" variant="outline">
                Luyện tập 4 kỹ năng
              </ButtonLink>
            </div>
          </div>

          {/* Lưới thông tin 2 cột — mô-típ ĐỐI TƯỢNG / CẤU TRÚC của cẩm nang */}
          <dl className="mt-14 grid gap-x-12 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label-caps flex items-center gap-2">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                Lộ trình
              </dt>
              <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                Kiểm tra đầu vào miễn phí, thiết kế lộ trình theo band hiện tại
              </dd>
            </div>
            <div>
              <dt className="label-caps flex items-center gap-2">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Quy mô lớp
              </dt>
              <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                Tối đa 8 học viên · giáo viên theo sát từng người
              </dd>
            </div>
            <div>
              <dt className="label-caps flex items-center gap-2">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                Chương trình
              </dt>
              <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                3 giai đoạn Pre-IELTS → Basic → Advanced · luôn cập nhật xu hướng đề thi
              </dd>
            </div>
            <div>
              <dt className="label-caps flex items-center gap-2">
                <Laptop className="h-3.5 w-3.5" aria-hidden="true" />
                Hình thức
              </dt>
              <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                Trực tiếp tại trung tâm kết hợp nền tảng luyện tập online
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== Mục lục chương trình — mô-típ mục lục cẩm nang ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <SectionHeading label="Mục lục" title="Nội dung đào tạo" />
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {TOC.map((item) => (
            <li key={item.no}>
              <Link
                href={item.href}
                className="group flex items-baseline gap-5 py-5 transition-colors hover:bg-paper md:gap-8 md:px-4"
              >
                <span className="font-ui text-sm font-semibold tabular-nums text-gold">
                  {item.no}
                </span>
                <span className="flex-1">
                  <span className="font-display text-xl font-semibold text-navy-deep transition-colors group-hover:text-navy md:text-[1.35rem]">
                    {item.title}
                  </span>
                  <span className="mt-1 block font-ui text-sm text-muted">
                    {item.note}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 self-center text-line-strong transition-all group-hover:translate-x-1 group-hover:text-gold"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== 4 kỹ năng ===== */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <SectionHeading
            label="Phòng luyện tập"
            title="Bốn kỹ năng, một tiêu chuẩn phòng thi"
            align="center"
          />
          <p className="mx-auto mt-6 max-w-2xl text-center text-[1.02rem] leading-relaxed text-ink-soft">
            Đăng ký tài khoản miễn phí để vào phòng luyện tập: làm bài đúng
            format IELTS, đồng hồ đếm ngược như thi thật và nhận kết quả ngay.
          </p>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group bg-paper p-8 transition-colors hover:bg-cream"
              >
                <s.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-deep">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-ui text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy group-hover:text-gold">
                  Vào luyện tập
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Kết quả học viên ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Bảng vàng" title="Kết quả nói thay lời cam kết" />
          <ButtonLink href="/ket-qua-hoc-vien" variant="outline" className="mb-1">
            Xem tất cả
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {RESULTS.map((r) => (
            <div key={r.name} className="border border-line bg-paper p-7 shadow-card">
              <p className="font-display text-5xl font-bold text-gold">{r.band}</p>
              <p className="mt-4 font-ui text-[0.95rem] font-semibold text-navy-deep">
                {r.name}
              </p>
              <p className="mt-1 font-ui text-sm text-muted">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA cuối trang ===== */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <SectionHeading
            label="Bắt đầu hành trình"
            title="Sẵn sàng bước lên nhịp cầu đầu tiên?"
            align="center"
          />
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
            Đăng ký tài khoản để luyện tập miễn phí, hoặc đặt lịch kiểm tra
            trình độ đầu vào 1-1 cùng giáo viên Wobridges.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/dang-ky" variant="gold">
              Đăng ký học thử miễn phí
            </ButtonLink>
            <ButtonLink href="/khoa-hoc-ielts" variant="outline">
              Tìm hiểu lộ trình IELTS
            </ButtonLink>
          </div>
          <NoteBox className="mt-12 text-left" title="Lưu ý">
            Kết quả học tập phụ thuộc vào điểm xuất phát và mức độ chuyên cần của
            từng học viên. Wobridges cam kết minh bạch lộ trình, đồng hành sát sao
            và hoàn trả quyền lợi theo đúng hợp đồng đào tạo.
          </NoteBox>
        </div>
      </section>
    </>
  );
}
