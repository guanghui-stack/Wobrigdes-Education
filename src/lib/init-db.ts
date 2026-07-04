import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import seedData from "../../prisma/seed-data.json";

/**
 * Tạo bảng trực tiếp bằng SQL (tương đương `prisma db push` cho schema hiện tại)
 * — không cần Prisma CLI trên hosting. `IF NOT EXISTS` nên chạy lại vô hại.
 */
const DDL = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE TABLE IF NOT EXISTS "Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skill" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "durationMinutes" INTEGER NOT NULL DEFAULT 60,
    "content" TEXT NOT NULL DEFAULT '{}',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Attempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadlineAt" DATETIME NOT NULL,
    "submittedAt" DATETIME,
    "autoSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "answers" TEXT NOT NULL DEFAULT '{}',
    "scoreRaw" INTEGER,
    "scoreTotal" INTEGER,
    "band" REAL,
    "feedback" TEXT,
    "gradedAt" DATETIME,
    "gradedById" TEXT,
    CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attempt_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "Attempt_userId_status_idx" ON "Attempt"("userId", "status")`,
  `CREATE INDEX IF NOT EXISTS "Attempt_exerciseId_status_idx" ON "Attempt"("exerciseId", "status")`,
];

export async function initDatabase() {
  for (const stmt of DDL) {
    await db.$executeRawUnsafe(stmt);
  }

  // Seed admin + bài tập mẫu từ JSON đóng gói kèm ứng dụng
  // (bỏ qua phần đã tồn tại — chạy lại vô hại, không ghi đè dữ liệu).
  const admin = await db.user.findUnique({
    where: { email: seedData.admin.email },
  });
  if (!admin) {
    await db.user.create({
      data: {
        email: seedData.admin.email,
        name: seedData.admin.name,
        passwordHash: await bcrypt.hash(seedData.admin.password, 10),
        role: "ADMIN",
      },
    });
    console.log(`[wobridges] Đã tạo tài khoản admin: ${seedData.admin.email}`);
  }

  for (const ex of seedData.exercises) {
    const existing = await db.exercise.findFirst({ where: { title: ex.title } });
    if (!existing) {
      await db.exercise.create({
        data: {
          skill: ex.skill,
          taskType: ex.taskType,
          title: ex.title,
          description: ex.description,
          durationMinutes: ex.durationMinutes,
          content: JSON.stringify(ex.content),
        },
      });
      console.log(`[wobridges] Đã tạo bài tập: ${ex.title}`);
    }
  }
}
