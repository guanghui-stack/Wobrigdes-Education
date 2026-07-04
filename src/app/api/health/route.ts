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

  try {
    const [users, exercises, admins] = await Promise.all([
      db.user.count(),
      db.exercise.count(),
      db.user.count({ where: { role: "ADMIN" } }),
    ]);
    report.database = "ok";
    report.userCount = users;
    report.adminCount = admins;
    report.exerciseCount = exercises;
  } catch (err) {
    report.database = "error";
    report.databaseError = String(err).slice(0, 400);
  }

  return NextResponse.json(report, {
    status: report.database === "ok" ? 200 : 500,
  });
}
