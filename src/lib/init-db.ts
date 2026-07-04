import path from "node:path";
import { pathToFileURL } from "node:url";
import { db } from "@/lib/db";

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

  // Seed admin + bài tập mẫu (script tự bỏ qua nếu đã tồn tại).
  // Import động qua Function để bundler không cố đóng gói file .mjs.
  const seedUrl = pathToFileURL(
    path.join(process.cwd(), "prisma", "seed.mjs")
  ).href;
  const dynamicImport = new Function("u", "return import(u)") as (
    u: string
  ) => Promise<{ default: Promise<void> }>;
  const mod = await dynamicImport(seedUrl);
  await mod.default;
}
