import type { Metadata } from "next";
import { PageHero, SectionHeading, NoteBox, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Bài mẫu Writing 8.0+",
  description:
    "Kho bài mẫu IELTS Writing band 8.0+ của Wobridges — bài viết hoàn chỉnh kèm phân tích cấu trúc, từ vựng ghi điểm và nhận xét theo rubric giám khảo.",
};

const VOCAB_T2 = [
  ["full linguistic immersion", "sự đắm mình hoàn toàn vào môi trường ngôn ngữ"],
  ["no substitute for", "không gì thay thế được"],
  ["self-discipline", "tính tự kỷ luật"],
  ["a passive bystander", "người đứng ngoài thụ động"],
  ["deliberate practice", "luyện tập có chủ đích"],
  ["expatriate communities", "cộng đồng người nước ngoài"],
];

const VOCAB_T1 = [
  ["a marked upward trend", "xu hướng tăng rõ rệt"],
  ["more than tripled", "tăng hơn gấp ba"],
  ["narrowed considerably", "thu hẹp đáng kể"],
  ["near-universal access", "mức tiếp cận gần như tuyệt đối"],
  ["respectively", "lần lượt"],
];

export default function WritingSamplesPage() {
  return (
    <>
      <PageHero
        label="Tư liệu tham khảo"
        title="Bài mẫu Writing 8.0+"
        lede="Mỗi bài mẫu dưới đây do đội ngũ học thuật Wobridges biên soạn và thẩm định theo rubric 4 tiêu chí của giám khảo — kèm phân tích để bạn học được cách tư duy, không chỉ chép câu chữ."
      />

      {/* ===== Bài mẫu Task 2 ===== */}
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-navy px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-paper">
            Task 2 · Discuss both views
          </span>
          <span className="border border-gold px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
            Band 8.5
          </span>
        </div>

        <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-navy-deep md:text-3xl">
          Học ngoại ngữ ở nước bản xứ hay tự nỗ lực tại quê nhà?
        </h2>
        <div className="rule-gold mt-5" />

        <NoteBox className="mt-8" title="Đề bài">
          <em>
            Some people believe that the best way to learn a foreign language is
            to live in a country where it is spoken. Others think that success
            depends mainly on the learner&apos;s own effort, wherever they study.
            Discuss both these views and give your own opinion.
          </em>
        </NoteBox>

        <div className="mt-10 border border-line bg-paper p-8 shadow-card md:p-10">
          <p className="label-caps">Bài mẫu · 312 từ</p>
          <div className="mt-6 space-y-5 leading-[1.85] text-ink">
            <p>
              Whether mastery of a foreign language requires living abroad or
              simply sustained personal effort is a matter of ongoing debate.
              While I accept that residence in a target-language country offers
              unrivalled exposure, I believe that the learner&apos;s own commitment
              is ultimately the decisive factor.
            </p>
            <p>
              Advocates of studying abroad point to the power of full linguistic
              immersion. Surrounded by native speakers, learners are compelled to
              negotiate daily life — ordering food, opening bank accounts,
              making friends — in the new language, and this constant, authentic
              practice accelerates both fluency and cultural understanding.
              There is, moreover, no substitute for absorbing the rhythms of
              natural speech as it is actually used, something textbooks
              routinely fail to capture.
            </p>
            <p>
              However, geography alone guarantees nothing. Every major city
              contains expatriate communities whose members have lived abroad
              for decades while barely progressing beyond survival phrases,
              precisely because they retreat into their mother tongue at every
              opportunity. Conversely, the internet has placed near-native
              exposure within anyone&apos;s reach: a disciplined learner in Hanoi
              can spend hours each day listening to podcasts, writing essays for
              online correction and conversing with speakers worldwide. What
              separates successful learners from unsuccessful ones is therefore
              not location but deliberate practice — setting goals, seeking
              feedback and refusing to remain a passive bystander in the
              learning process.
            </p>
            <p>
              In conclusion, although living abroad provides an enviable
              environment, it is neither a necessary nor a sufficient condition
              for success. Self-discipline and consistent, purposeful practice
              matter more; the ideal, of course, is to combine both, but where a
              choice must be made, effort will always outweigh address.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="label-caps">Vì sao đạt 8.5</p>
            <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">Task Response:</strong> trả lời đủ
                cả hai luồng ý kiến, lập trường nhất quán từ mở bài đến kết luận.
              </li>
              <li>
                <strong className="text-ink">Coherence:</strong> mỗi đoạn một ý
                trung tâm; phép nối tự nhiên (however, conversely, therefore)
                thay vì công thức.
              </li>
              <li>
                <strong className="text-ink">Lexical Resource:</strong> collocation
                chính xác và ít gặp — xem bảng từ vựng bên cạnh.
              </li>
              <li>
                <strong className="text-ink">Grammar:</strong> đa dạng cấu trúc
                (đảo ngữ &quot;There is, moreover…&quot;, mệnh đề nhượng bộ, câu
                điều kiện rút gọn) hầu như không lỗi.
              </li>
            </ul>
          </div>
          <div>
            <p className="label-caps">Từ vựng ghi điểm</p>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {VOCAB_T2.map(([en, vi]) => (
                <div key={en} className="grid grid-cols-[1fr_1fr] gap-4 py-2.5">
                  <dt className="font-ui text-sm font-semibold text-navy">{en}</dt>
                  <dd className="text-sm text-ink-soft">{vi}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>

      {/* ===== Bài mẫu Task 1 ===== */}
      <div className="border-t border-line bg-paper">
        <article className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-navy px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-paper">
              Task 1 · Table
            </span>
            <span className="border border-gold px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
              Band 8.0
            </span>
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-navy-deep md:text-3xl">
            Tỷ lệ hộ gia đình có Internet tại Đông Nam Á
          </h2>
          <div className="rule-gold mt-5" />

          <NoteBox className="mt-8" title="Đề bài">
            <em>
              The table below shows the percentage of households with internet
              access in three Southeast Asian countries between 2010 and 2020.
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </em>
          </NoteBox>

          <table className="mt-8 w-full border border-line font-ui text-sm">
            <caption className="border border-b-0 border-line bg-cream-deep px-4 py-2.5 text-left font-semibold text-ink">
              Households with internet access (%)
            </caption>
            <thead>
              <tr className="bg-navy text-paper">
                {["Country", "2010", "2015", "2020"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["Vietnam", "27", "52", "78"],
                ["Thailand", "23", "52", "85"],
                ["Singapore", "82", "91", "98"],
              ].map((row) => (
                <tr key={row[0]} className="bg-paper">
                  {row.map((cell, i) => (
                    <td key={i} className={`px-4 py-2.5 ${i === 0 ? "font-semibold text-ink" : "tabular-nums text-ink-soft"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 border border-line bg-cream p-8 shadow-card md:p-10">
            <p className="label-caps">Bài mẫu · 178 từ</p>
            <div className="mt-6 space-y-5 leading-[1.85] text-ink">
              <p>
                The table compares the proportion of households connected to the
                internet in Vietnam, Thailand and Singapore at five-year
                intervals between 2010 and 2020.
              </p>
              <p>
                Overall, all three countries recorded a marked upward trend, and
                the gap between Singapore and its two neighbours narrowed
                considerably. While Singapore enjoyed near-universal access by
                the end of the period, the most dramatic growth occurred in
                Vietnam and Thailand.
              </p>
              <p>
                In 2010, internet access was still limited in Vietnam and
                Thailand, at 27% and 23% of households respectively, whereas
                Singapore&apos;s figure was already 82%. Over the following five
                years, the two developing economies converged at exactly 52%,
                roughly doubling their initial rates, while Singapore climbed
                more modestly to 91%.
              </p>
              <p>
                By 2020, Thailand had overtaken Vietnam, its share having more
                than tripled to 85% compared with Vietnam&apos;s 78%. Singapore,
                meanwhile, reached 98%, meaning that virtually every household
                in the city-state was online by the end of the decade.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="label-caps">Vì sao đạt 8.0</p>
              <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                <li>
                  <strong className="text-ink">Overview đúng chuẩn:</strong> nêu
                  hai đặc điểm bao quát (xu hướng tăng, khoảng cách thu hẹp)
                  không kèm số liệu.
                </li>
                <li>
                  <strong className="text-ink">Chọn lọc thông minh:</strong>{" "}
                  nhóm Việt Nam – Thái Lan để so sánh với Singapore thay vì liệt
                  kê từng ô số liệu.
                </li>
                <li>
                  <strong className="text-ink">Ngôn ngữ số liệu linh hoạt:</strong>{" "}
                  doubled, more than tripled, converged, overtaken — tránh lặp
                  &quot;increased&quot;.
                </li>
              </ul>
            </div>
            <div>
              <p className="label-caps">Từ vựng ghi điểm</p>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {VOCAB_T1.map(([en, vi]) => (
                  <div key={en} className="grid grid-cols-[1fr_1fr] gap-4 py-2.5">
                    <dt className="font-ui text-sm font-semibold text-navy">{en}</dt>
                    <dd className="text-sm text-ink-soft">{vi}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </article>
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading
          label="Đến lượt bạn"
          title="Viết bài của chính mình và được chấm chữa"
          align="center"
        />
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">
          Đọc bài mẫu là bước khởi đầu — tiến bộ thật sự đến từ việc tự viết và
          nhận phản hồi. Vào phòng luyện Writing, làm bài trong điều kiện thi
          thật và nhận nhận xét chi tiết từ giáo viên Wobridges.
        </p>
        <div className="mt-9 flex justify-center">
          <ButtonLink href="/luyen-tap/writing" variant="gold">
            Vào phòng luyện Writing
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
