import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHero, SectionHeading, NoteBox, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kết quả học viên",
  description:
    "Bảng vàng thành tích học viên Wobridges — band điểm thật, lộ trình thật và câu chuyện của những người đã bước qua cây cầu đầu tiên.",
};

const BOARD = [
  { name: "Nguyễn Minh Anh", start: "6.0", end: "8.0", months: 5, target: "Học bổng thạc sĩ Anh", course: "Intensive 7.0" },
  { name: "Trần Quốc Bảo", start: "5.5", end: "7.5", months: 6, target: "Du học Canada", course: "Intensive 7.0" },
  { name: "Lê Thu Hà", start: "5.5", end: "7.0", months: 6, target: "Du học Úc", course: "Intensive 7.0" },
  { name: "Phạm Đức Long", start: "6.5", end: "7.5", months: 4, target: "Định cư tay nghề", course: "E-learning Writing" },
  { name: "Võ Ngọc Trâm", start: "5.0", end: "7.0", months: 8, target: "Xét tuyển đại học", course: "Intensive 7.0" },
  { name: "Đặng Hải Nam", start: "6.0", end: "7.0", months: 5, target: "Yêu cầu công việc", course: "E-learning Speaking" },
];

const STORIES = [
  {
    name: "Minh Anh · 8.0 Overall",
    quote:
      "Điều làm mình gắn bó với Wobridges là các bài Writing được chấm kỹ đến từng lỗi collocation. Sau 16 bài được chấm chữa, mình từ 6.0 Writing lên 7.5 — con số mà trước đó mình nghĩ là không thể.",
  },
  {
    name: "Quốc Bảo · 7.5 Overall",
    quote:
      "Phòng luyện tập online có đồng hồ đếm ngược giúp mình quen áp lực thời gian từ tuần đầu tiên. Vào phòng thi thật, cảm giác giống hệt lúc luyện — không còn run nữa.",
  },
  {
    name: "Thu Hà · 7.0 Overall",
    quote:
      "Lớp chỉ 8 người nên không giấu dốt được — và đó chính là điều mình cần. Cô giáo nhớ từng lỗi phát âm của mình và nhắc đến khi nào sửa được mới thôi.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        label="Bảng vàng"
        title="Kết quả học viên"
        lede="Chúng tôi tin rằng cách quảng bá tốt nhất là kết quả có thể kiểm chứng. Dưới đây là band điểm đầu vào – đầu ra thật của học viên Wobridges trong các khoá gần nhất."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Số liệu" title="Đầu vào → đầu ra" />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border border-line font-ui text-sm">
            <thead>
              <tr className="bg-navy text-paper">
                <th className="px-5 py-3 text-left font-semibold">Học viên</th>
                <th className="px-5 py-3 text-center font-semibold">Đầu vào</th>
                <th className="px-5 py-3 text-center font-semibold">Đầu ra</th>
                <th className="px-5 py-3 text-center font-semibold">Thời gian</th>
                <th className="px-5 py-3 text-left font-semibold">Mục tiêu</th>
                <th className="px-5 py-3 text-left font-semibold">Khoá học</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {BOARD.map((r) => (
                <tr key={r.name} className="bg-paper transition-colors hover:bg-cream">
                  <td className="px-5 py-3.5 font-semibold text-ink">{r.name}</td>
                  <td className="px-5 py-3.5 text-center tabular-nums text-ink-soft">{r.start}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-block min-w-[3rem] border border-gold bg-gold-pale px-2 py-0.5 font-display text-base font-bold text-navy-deep">
                      {r.end}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center tabular-nums text-ink-soft">{r.months} tháng</td>
                  <td className="px-5 py-3.5 text-ink-soft">{r.target}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{r.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-ui text-xs text-muted">
          * Dữ liệu minh họa cho phiên bản demo — sẽ được thay bằng bảng điểm thật kèm phiếu điểm khi website chính thức vận hành.
        </p>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading label="Câu chuyện" title="Học viên nói về Wobridges" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STORIES.map((s) => (
              <figure key={s.name} className="flex flex-col border border-line bg-cream p-8">
                <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[0.98rem] italic leading-relaxed text-ink">
                  “{s.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 font-ui text-sm font-semibold text-navy">
                  {s.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading label="Chỗ của bạn còn trống" title="Tên tiếp theo trên bảng vàng là bạn?" align="center" />
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">
          Bắt đầu bằng một bài kiểm tra đầu vào miễn phí — bạn sẽ biết chính xác
          mình đang ở đâu và cần bao lâu để tới đích.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/dang-ky" variant="gold">Đặt lịch kiểm tra miễn phí</ButtonLink>
          <ButtonLink href="/khoa-hoc-intensive" variant="outline">Xem khoá Intensive 7.0</ButtonLink>
        </div>
        <NoteBox className="mt-12 text-left" title="Minh bạch">
          Wobridges chỉ công bố kết quả khi có phiếu điểm đối chứng và được học
          viên đồng ý chia sẻ. Trung tâm không mua bán chứng chỉ, không cam kết
          ảo — mọi con số đều có hồ sơ đi kèm.
        </NoteBox>
      </section>
    </>
  );
}
