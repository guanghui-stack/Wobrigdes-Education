import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  UserRoundPlus,
  TimerReset,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero, SectionHeading, NoteBox } from "@/components/ui";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Luyện tập 4 kỹ năng",
  description:
    "Phòng luyện tập IELTS online của Wobridges — làm bài Reading, Writing đúng format và điều kiện thời gian thi thật, chấm chữa bởi giáo viên.",
};

const SKILL_CARDS = [
  {
    icon: BookOpen,
    href: "/luyen-tap/reading",
    title: "Reading",
    status: "Chấm điểm tự động",
    desc: "Passage học thuật với đầy đủ dạng câu hỏi TRUE/FALSE/NOT GIVEN, Multiple Choice, Completion. Đồng hồ đếm ngược, nộp bài là biết điểm ngay.",
  },
  {
    icon: Headphones,
    href: "/luyen-tap/listening",
    title: "Listening",
    status: "Gợi ý chủ đề",
    desc: "Danh mục chủ đề và nguồn luyện nghe chọn lọc theo Section 1–4, kèm phương pháp nghe chép chính tả hiệu quả.",
  },
  {
    icon: PenLine,
    href: "/luyen-tap/writing",
    title: "Writing",
    status: "Giáo viên chấm",
    desc: "Viết Task 1 và Task 2 trong điều kiện phòng thi với đồng hồ đếm ngược. Giáo viên chấm bằng rubric 4 tiêu chí và nhận xét chi tiết.",
  },
  {
    icon: Mic,
    href: "/luyen-tap/speaking",
    title: "Speaking",
    status: "Gợi ý chủ đề",
    desc: "Bộ chủ đề Part 1–3 cập nhật theo quý cùng gợi ý ý tưởng, từ vựng và cấu trúc trả lời ghi điểm.",
  },
];

const HOW = [
  {
    icon: UserRoundPlus,
    title: "1. Tạo tài khoản",
    desc: "Đăng ký miễn phí bằng email — tài khoản là hồ sơ học tập theo dõi mọi bài làm của bạn.",
  },
  {
    icon: TimerReset,
    title: "2. Làm bài như thi thật",
    desc: "Chọn bài, bấm bắt đầu và làm trong thời gian quy định. Hết giờ hệ thống tự động nộp bài.",
  },
  {
    icon: ClipboardCheck,
    title: "3. Nhận kết quả & nhận xét",
    desc: "Reading chấm ngay lập tức. Writing được giáo viên chấm bằng rubric trong 48 giờ.",
  },
];

export default async function PracticeHubPage() {
  const user = await getCurrentUser();
  const counts = await db.exercise.groupBy({
    by: ["skill"],
    where: { published: true },
    _count: { _all: true },
  });
  const countBySkill = Object.fromEntries(
    counts.map((c) => [c.skill, c._count._all])
  );
  const skillKey: Record<string, string> = {
    Reading: "READING",
    Listening: "LISTENING",
    Writing: "WRITING",
    Speaking: "SPEAKING",
  };

  return (
    <>
      <PageHero
        label="Phòng luyện tập"
        title="Luyện tập 4 kỹ năng"
        lede="Không gian luyện thi mô phỏng điều kiện phòng thi thật — có áp lực thời gian, có kết quả, có người chấm chữa. Tất cả bài làm được lưu vào hồ sơ học tập của bạn."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_CARDS.map((s) => {
            const n = countBySkill[skillKey[s.title]] ?? 0;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group border border-line bg-paper p-8 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <span className="border border-line bg-cream px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                    {s.status}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-navy-deep">
                  IELTS {s.title}
                </h2>
                {n > 0 && (
                  <p className="mt-1 font-ui text-sm text-gold">
                    {n} bài luyện đang mở
                  </p>
                )}
                <p className="mt-3 leading-relaxed text-ink-soft">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-ui text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy group-hover:text-gold">
                  Mở phòng luyện {s.title}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading label="Cách hoạt động" title="Ba bước vào phòng thi" align="center" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {HOW.map((h) => (
              <div key={h.title} className="text-center">
                <h.icon className="mx-auto h-7 w-7 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-deep">
                  {h.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
          {!user && (
            <NoteBox className="mx-auto mt-14 max-w-3xl" title="Miễn phí">
              Phòng luyện tập mở miễn phí cho mọi học viên có tài khoản.{" "}
              <Link href="/dang-ky" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold">
                Đăng ký ngay
              </Link>{" "}
              — chỉ mất một phút với địa chỉ email của bạn.
            </NoteBox>
          )}
        </div>
      </section>
    </>
  );
}
