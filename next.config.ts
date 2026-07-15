import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Đường dẫn cũ của trang khóa học — giữ để link cũ không gãy
      {
        source: "/khoa-hoc-intensive",
        destination: "/khoa-hoc-ielts",
        permanent: true,
      },
    ];
  },
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
