import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { MAIN_NAV, SKILL_NAV } from "@/lib/nav";
import { BridgeMark } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy-deep text-cream">
      <div className="h-[3px] bg-gold" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BridgeMark className="h-10 w-10 [&_circle]:stroke-cream [&_path]:stroke-gold-soft" />
            <div className="leading-none">
              <p className="font-display text-xl font-bold text-paper">Wobridges</p>
              <p className="mt-1 font-ui text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-soft">
                World Bridges · English Center
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream/75">
            Những cây cầu nối bạn với thế giới — đào tạo IELTS chuyên sâu với lộ
            trình cá nhân hóa, luyện tập 4 kỹ năng chuẩn format và đội ngũ giáo
            viên chấm chữa tận tâm.
          </p>
          <ul className="mt-6 space-y-2.5 font-ui text-sm text-cream/85">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
              123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
              0901 234 567
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
              hello@wobridges.vn
            </li>
          </ul>
        </div>

        <nav aria-label="Liên kết nhanh">
          <p className="label-caps text-gold-soft">Khám phá</p>
          <ul className="mt-4 space-y-2.5">
            {MAIN_NAV.filter((i) => i.href !== "/").map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-ui text-sm text-cream/80 transition-colors hover:text-gold-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Luyện tập">
          <p className="label-caps text-gold-soft">Luyện tập 4 kỹ năng</p>
          <ul className="mt-4 space-y-2.5">
            {SKILL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-ui text-sm text-cream/80 transition-colors hover:text-gold-soft"
                >
                  IELTS {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label-caps mt-8 text-gold-soft">Học viên</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/dang-nhap" className="font-ui text-sm text-cream/80 transition-colors hover:text-gold-soft">
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link href="/dang-ky" className="font-ui text-sm text-cream/80 transition-colors hover:text-gold-soft">
                Đăng ký tài khoản
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-6 py-5 font-ui text-xs tracking-wide text-cream/50">
          © {new Date().getFullYear()} Wobridges English Center. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  );
}
