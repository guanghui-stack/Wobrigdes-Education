import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Website chạy sau CDN/proxy của Hostinger — khai báo tên miền hợp lệ
      // để form (đăng nhập, nộp bài…) không bị chặn vì lệch origin.
      allowedOrigins: [
        "wobridgeacademy.com",
        "www.wobridgeacademy.com",
        "wobridges.com",
        "www.wobridges.com",
        "*.hostingersite.com",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
