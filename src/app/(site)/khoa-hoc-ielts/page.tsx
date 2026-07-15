import type { Metadata } from "next";
import {
  CalendarClock,
  Target,
  Users,
  Check,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { PageHero, SectionHeading, NoteBox, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Khóa học IELTS",
  description:
    "Lộ trình IELTS 3 giai đoạn tại Wobridges: Pre-IELTS (0–3.0) → Basic (3.0–4.5) → Advanced (4.5–6.5+). Chương trình chi tiết, luôn cập nhật xu hướng đề thi.",
};

const STAGES = [
  {
    no: "Giai đoạn 1",
    focus: "Xây dựng nền tảng, làm quen với IELTS",
    course: "Pre-IELTS",
    band: "0 – 3.0",
    sessions: 20,
    audience: [
      "Người mất gốc tiếng Anh hoặc mới bắt đầu học",
      "Chưa từng học IELTS, muốn làm quen với kỳ thi",
      "Trình độ khoảng IELTS 0–3.0 (tương đương A1–A2 CEFR)",
      "Còn hạn chế ngữ pháp, từ vựng, phát âm — chưa tự tin dùng tiếng Anh",
      "Cần xây nền tảng trước khi bước vào các khóa luyện thi",
    ],
  },
  {
    no: "Giai đoạn 2",
    focus: "Đi sâu kiến thức 4 kỹ năng cho từng dạng bài IELTS",
    course: "Basic",
    band: "3.0 – 4.5",
    sessions: 22,
    audience: [
      "Đã có nền tảng tiếng Anh cơ bản nhưng chưa vững",
      "Trình độ khoảng IELTS 3.0–4.5 (A2 – đầu B1 CEFR)",
      "Biết ngữ pháp cơ bản nhưng còn mắc nhiều lỗi khi sử dụng",
      "Muốn mở rộng từ vựng, cải thiện phát âm, phát triển đều 4 kỹ năng",
      "Hướng tới mục tiêu IELTS 5.0–5.5, cần củng cố trước khi học nâng cao",
    ],
  },
  {
    no: "Giai đoạn 3",
    focus: "Chiến thuật, kỹ năng làm bài và đạt điểm cao",
    course: "Advanced",
    band: "4.5 – 6.5+",
    sessions: 24,
    audience: [
      "Nền tảng tiếng Anh khá, tương đương IELTS 4.5–6.5+",
      "Muốn dùng tiếng Anh trong môi trường học thuật và công việc",
      "Cần cải thiện độ chính xác, trôi chảy và tự nhiên khi diễn đạt",
      "Hướng tới IELTS 6.5+ hoặc chứng chỉ quốc tế trình độ cao hơn",
      "Sinh viên, người đi làm cần thuyết trình, viết học thuật, làm việc quốc tế",
    ],
  },
];

const COURSES = [
  {
    name: "Pre-IELTS",
    band: "0 – 3.0",
    sessions: 20,
    price: "7.500.000₫",
    goals: [
      "Củng cố ngữ pháp, từ vựng và phát âm — nền tảng vững chắc cho lộ trình IELTS",
      "Phát triển đồng đều 4 kỹ năng ở mức nền tảng, tự tin dùng tiếng Anh hằng ngày",
      "Làm quen cấu trúc đề IELTS và các kỹ năng lõi: skimming, scanning, note-taking, paraphrasing",
      "Rèn viết đoạn văn và diễn đạt ý mạch lạc, chuẩn bị cho IELTS Writing",
      "Sẵn sàng chuyển tiếp lên khóa Basic (3.0–4.5)",
    ],
  },
  {
    name: "Basic",
    band: "3.0 – 4.5",
    sessions: 22,
    price: "8.500.000₫",
    highlight: true,
    goals: [
      "Mở rộng ngữ pháp và từ vựng học thuật theo chủ đề thường gặp trong IELTS",
      "Rèn các dạng bài IELTS phổ biến cùng kỹ năng làm bài: identifying key information, paraphrasing, note-taking",
      "Nâng khả năng diễn đạt nói – viết với từ vựng và cấu trúc câu đa dạng hơn",
      "Cải thiện phát âm, ngữ điệu và độ trôi chảy để giao tiếp tự nhiên, tự tin",
      "Viết đoạn văn, bài luận ngắn có bố cục logic — sẵn sàng học lên Advanced",
    ],
  },
  {
    name: "Advanced",
    band: "4.5 – 6.5+",
    sessions: 24,
    price: "9.500.000₫",
    goals: [
      "Nắm vững format và tiêu chí chấm điểm từng dạng bài của cả 4 kỹ năng",
      "Vận dụng chiến thuật cho mọi dạng câu hỏi Listening – Reading, tối ưu độ chính xác và thời gian",
      "Phát triển tư duy học thuật: phân tích đề, xây dựng luận điểm, triển khai bài viết – bài nói chặt chẽ",
      "Thành thạo Writing Task 1 & Task 2; Speaking phản xạ tự nhiên với phản hồi trực tiếp từ giáo viên",
      "Hệ thống chữa bài chi tiết giúp tự nhận diện lỗi — tự tin chinh phục IELTS 6.5+",
    ],
  },
];

export default function IeltsCoursesPage() {
  return (
    <>
      <PageHero
        label="Chương trình đào tạo"
        title="Lộ trình IELTS ba giai đoạn"
        lede="Chương trình học gồm 3 giai đoạn từ cơ bản đến nâng cao với lộ trình chi tiết, luôn được cập nhật để học viên nắm đúng xu hướng đề thi IELTS."
      />

      {/* ===== Lộ trình 3 giai đoạn ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Lộ trình" title="Ba giai đoạn — một đích đến" />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {STAGES.map((s) => (
            <article
              key={s.no}
              className="grid gap-6 py-10 md:grid-cols-[260px_1fr] md:gap-12"
            >
              <header>
                <p className="label-caps">{s.no}</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-navy-deep">
                  {s.course}
                </h3>
                <p className="mt-1 font-ui text-sm text-gold">
                  Band {s.band}
                </p>
                <p className="mt-3 flex items-center gap-2 font-ui text-sm text-ink-soft">
                  <CalendarClock className="h-4 w-4 text-gold" aria-hidden="true" />
                  {s.sessions} buổi học
                </p>
              </header>
              <div>
                <p className="font-ui text-[0.95rem] font-semibold text-ink">
                  {s.focus}
                </p>
                <p className="label-caps mt-4 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  Phù hợp với ai?
                </p>
                <ul className="mt-3 space-y-2">
                  {s.audience.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Mục tiêu & học phí ===== */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading
            label="Mục tiêu & học phí"
            title="Mỗi khóa học, một bước tiến rõ ràng"
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {COURSES.map((c) => (
              <article
                key={c.name}
                className={`flex flex-col border bg-paper p-8 shadow-card ${
                  c.highlight ? "border-gold" : "border-line"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <GraduationCap className="h-6 w-6 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-2xl font-bold text-navy-deep">
                      {c.name}
                    </h3>
                    <p className="mt-1 font-ui text-sm text-muted">
                      Band {c.band} · {c.sessions} buổi
                    </p>
                  </div>
                  <p className="shrink-0 text-right font-display text-xl font-bold text-gold">
                    {c.price}
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
                  {c.goals.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-ink-soft">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {g}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/dang-ky"
                  variant={c.highlight ? "gold" : "outline"}
                  className="mt-7 self-start"
                >
                  Đăng ký khóa {c.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading
          label="Bắt đầu từ đâu?"
          title="Chưa biết mình ở giai đoạn nào?"
          align="center"
        />
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">
          Đặt lịch kiểm tra trình độ đầu vào miễn phí — giáo viên Wobridges sẽ
          xác định chính xác band hiện tại của bạn và tư vấn giai đoạn phù hợp.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/dang-ky" variant="gold">
            <Target className="h-4 w-4" aria-hidden="true" />
            Đặt lịch kiểm tra đầu vào
          </ButtonLink>
          <ButtonLink href="/luyen-tap" variant="outline">
            Luyện tập 4 kỹ năng
          </ButtonLink>
        </div>
        <NoteBox className="mt-12 text-left" title="Lưu ý">
          Học phí trên là trọn gói cho từng khóa, đã bao gồm giáo trình và tài
          khoản luyện tập online không giới hạn trên nền tảng Wobridges. Chương
          trình được cập nhật thường xuyên theo xu hướng đề thi mới nhất.
        </NoteBox>
      </section>
    </>
  );
}
