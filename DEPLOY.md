# Hướng dẫn đưa website lên GitHub và Hostinger

Website là ứng dụng **Node.js có database** (đăng nhập, làm bài, chấm điểm) nên
**không chạy được trên gói Shared/Premium hosting thông thường** (các gói đó chỉ
chạy PHP/file tĩnh). Bạn cần **Hostinger VPS** — gói **KVM 1** (~119.000đ/tháng)
là đủ cho giai đoạn đầu.

---

## Phần 1 — Đẩy code lên GitHub

Đã cài [Git](https://git-scm.com/download/win) và có tài khoản GitHub? Làm theo:

```bash
# 1. Tạo repo mới trên github.com (ví dụ: wobridges) — chọn Private, KHÔNG tick "Add README"

# 2. Trong thư mục dự án wobridges, chạy:
git remote add origin https://github.com/<TÊN-TÀI-KHOẢN>/wobridges.git
git push -u origin main
```

> Repo đã được khởi tạo và commit sẵn. File `.env` và database `dev.db` được
> loại khỏi git — **không bao giờ** đưa hai file này lên GitHub.

---

## Phần 2 — Deploy lên Hostinger VPS

### Bước 1: Mua và khởi tạo VPS

1. Vào [hostinger.vn/vps-hosting](https://www.hostinger.vn/vps-hosting), chọn **KVM 1**.
2. Khi được hỏi hệ điều hành, chọn template **Ubuntu 24.04 with Node.js** (hoặc Ubuntu 24.04 thường).
3. Đặt mật khẩu root và lưu lại địa chỉ IP của VPS.

### Bước 2: Cài môi trường trên VPS

Mở terminal (hoặc dùng Browser Terminal trong hPanel), SSH vào VPS:

```bash
ssh root@<IP-CỦA-VPS>
```

Cài Node.js 22 + PM2 + Nginx (bỏ qua bước Node nếu dùng template có sẵn):

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs nginx git
npm install -g pm2
```

### Bước 3: Kéo code và chạy ứng dụng

```bash
cd /var/www
git clone https://github.com/<TÊN-TÀI-KHOẢN>/wobridges.git
cd wobridges
npm install

# Tạo file .env
cat > .env << 'EOF'
DATABASE_URL="file:./prod.db"
SESSION_SECRET="DÁN_CHUỖI_NGẪU_NHIÊN_VÀO_ĐÂY"
EOF
# Tạo chuỗi ngẫu nhiên: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Tạo database + tài khoản admin + đề mẫu
npx prisma db push
node prisma/seed.mjs

# Build và chạy bằng PM2 (tự khởi động lại khi VPS reboot)
npm run build
pm2 start npm --name wobridges -- start
pm2 save && pm2 startup
```

### Bước 4: Trỏ tên miền và cấu hình Nginx

1. Trong hPanel → DNS của tên miền, tạo bản ghi **A** trỏ về IP của VPS.
2. Trên VPS, tạo cấu hình Nginx:

```bash
cat > /etc/nginx/sites-available/wobridges << 'EOF'
server {
    listen 80;
    server_name wobridges.vn www.wobridges.vn;  # đổi thành tên miền của bạn

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
ln -s /etc/nginx/sites-available/wobridges /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

3. Cài SSL miễn phí (HTTPS):

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d wobridges.vn -d www.wobridges.vn
```

### Bước 5: Sau khi chạy

- Đăng nhập `https://<tên-miền>/dang-nhap` bằng `admin@wobridges.vn` /
  `Admin@Wobridges2026` và **đổi ngay mật khẩu** (tạm thời: tự đặt lại trong
  trang Quản lý học viên, hoặc sửa qua seed).
- Vào **Quản trị → Bài tập** để thay đề mẫu bằng đề thật của bạn.

---

## Cập nhật phiên bản mới

Mỗi khi sửa code và push lên GitHub, vào VPS chạy:

```bash
cd /var/www/wobridges
git pull
npm install
npx prisma db push   # nếu có thay đổi schema
npm run build
pm2 restart wobridges
```

## Sao lưu dữ liệu

Toàn bộ dữ liệu (học viên, bài làm, điểm) nằm trong một file duy nhất
`prisma/prod.db`. Sao lưu định kỳ:

```bash
# Chạy trên VPS — copy về máy của bạn
scp root@<IP-VPS>:/var/www/wobridges/prisma/prod.db ./backup-$(date +%Y%m%d).db
```

## Khi nào cần nâng cấp?

- **Trên ~500 học viên hoạt động thường xuyên**: chuyển SQLite → MySQL (Hostinger
  VPS cài được MySQL, chỉ cần đổi `datasource` trong `prisma/schema.prisma` và
  `DATABASE_URL`).
- **Cần gửi email tự động** (quên mật khẩu, thông báo chấm bài): dùng SMTP đi kèm
  Hostinger Email hoặc dịch vụ như Resend.
