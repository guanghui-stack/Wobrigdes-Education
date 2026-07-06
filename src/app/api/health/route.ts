import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Trạm kiểm tra tình trạng hệ thống — dùng để chẩn đoán từ xa khi
 * triển khai trên hosting. Chỉ trả về trạng thái, không lộ dữ liệu.
 */
export async function GET() {
  const report: Record<string, unknown> = {
    time: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    sessionSecretConfigured: Boolean(process.env.SESSION_SECRET),
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
    initStatus:
      (globalThis as { __wobridgesInit?: string }).__wobridgesInit ??
      "chưa chạy (dev hoặc instrumentation không được gọi)",
  };

  // Giới hạn 8 giây cho phần kiểm tra database — nếu kết nối bị treo
  // (thường do sai host trong DATABASE_URL) vẫn trả được báo cáo lỗi rõ ràng.
  const withTimeout = <T,>(p: Promise<T>, ms: number) =>
    Promise.race<T>([
      p,
      new Promise<T>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Hết thời gian chờ sau ${ms / 1000}s — kết nối database bị treo (kiểm tra phần host trong DATABASE_URL)`)),
          ms
        )
      ),
    ]);

  try {
    const [users, exercises, admins] = await withTimeout(
      Promise.all([
        db.user.count(),
        db.exercise.count(),
        db.user.count({ where: { role: "ADMIN" } }),
      ]),
      8000
    );
    report.database = "ok";
    report.userCount = users;
    report.adminCount = admins;
    report.exerciseCount = exercises;
  } catch (err) {
    report.database = "error";
    report.databaseError = String(err).slice(0, 400);
  }

  // Khi thiếu cấu hình DB, liệt kê TÊN các biến môi trường liên quan
  // (chỉ tên, không lộ giá trị) để chẩn đoán từ xa
  if (!process.env.DATABASE_URL) {
    report.dbRelatedEnvNames = Object.keys(process.env).filter((k) =>
      /mysql|maria|database|db_/i.test(k)
    );
  }

  return NextResponse.json(report, {
    status: report.database === "ok" ? 200 : 500,
  });
}
