# Wobridges English Center

Nền tảng website + e-learning của **Trung tâm Anh ngữ Wobridges** (World Bridges — "những cây cầu kết nối thế giới").

## Tính năng

**Trang công khai** (phong cách editorial: nền kem, navy, vàng đồng, serif):

- Trang chủ, Khóa học Intensive 7.0, Khoá E-learning lẻ
- Luyện tập 4 kỹ năng (Reading · Listening · Writing · Speaking)
- Bài mẫu Writing 8.0+ kèm phân tích, Kết quả học viên

**Nền tảng học viên** (đăng ký/đăng nhập bằng email):

- **Reading**: đề chuẩn format IELTS (TFNG, Multiple Choice, Completion), đồng hồ đếm ngược, tự nộp khi hết giờ, chấm điểm tự động ngay lập tức
- **Writing**: Task 1 & Task 2 với bộ đếm từ + đồng hồ đếm ngược, autosave mỗi 20 giây, nộp cho giáo viên chấm
- Hồ sơ học tập: tiến độ, lịch sử bài làm, xem điểm và nhận xét

**Khu quản trị** (`/quan-tri`):

- Tổng quan: thống kê + hàng chờ chấm
- Chấm bài Writing với band điểm + nhận xét theo rubric
- Quản lý bài tập: tạo/sửa đề Reading (JSON) & Writing (form), tùy chỉnh thời gian từng bài, ẩn/hiện đề
- Quản lý học viên: khóa tài khoản, đặt lại mật khẩu

## Công nghệ

| Thành phần | Lựa chọn |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| CSDL | SQLite qua Prisma 6 (dễ nâng cấp lên MySQL/PostgreSQL) |
| Xác thực | Email + mật khẩu (bcryptjs), phiên JWT cookie (jose) |
| Giao diện | Tailwind CSS 4, lucide-react, Google Fonts hỗ trợ tiếng Việt (Playfair Display, Source Serif 4, Be Vietnam Pro) |

## Chạy trên máy local

```bash
npm install
npx prisma db push        # tạo database SQLite
node prisma/seed.mjs      # tạo tài khoản admin + bài tập mẫu
npm run dev               # http://localhost:3000
```

File `.env` cần hai biến (xem `.env.example`):

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="<chuỗi ngẫu nhiên 64 ký tự hex>"
```

**Tài khoản admin mặc định sau khi seed:** `admin@wobridges.vn` / `Admin@Wobridges2026`
→ **Đổi mật khẩu này ngay khi đưa lên môi trường thật.**

## Triển khai

Xem hướng dẫn chi tiết trong [DEPLOY.md](./DEPLOY.md) (đẩy lên GitHub + deploy Hostinger VPS).

## Cấu trúc thư mục chính

```
src/
├── app/
│   ├── (site)/          # Trang công khai + khu học viên + quản trị (có header/footer)
│   ├── (exam)/lam-bai/  # Phòng làm bài (tối giản, không header marketing)
│   └── globals.css      # Design tokens editorial
├── components/          # Header, footer, form, phòng thi, admin
└── lib/
    ├── actions/         # Server actions: auth, attempts, admin
    ├── session.ts       # Phiên đăng nhập JWT
    ├── exercise-content.ts  # Cấu trúc đề + chấm Reading
    └── db.ts            # Prisma client
prisma/
├── schema.prisma        # User · Exercise · Attempt
└── seed.mjs             # Admin + đề mẫu
```
