import { execSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * Tự động chuẩn bị mọi thứ khi server khởi động, để người vận hành
 * không cần gõ lệnh trên hosting:
 *   1. Tạo file .env với SESSION_SECRET ngẫu nhiên nếu chưa có
 *   2. Tạo bảng database (prisma db push — an toàn, không xóa dữ liệu cũ)
 *   3. Seed tài khoản admin + bài tập mẫu nếu chưa tồn tại
 */
export async function setupServer() {
  const root = process.cwd();
  const envPath = path.join(root, ".env");
  const envText = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";

  const ensureEnv = (key: string, fallback: string) => {
    if (process.env[key]) return;
    const match = envText.match(new RegExp(`^${key}=["']?([^"'\r\n]+)`, "m"));
    if (match) {
      process.env[key] = match[1];
      return;
    }
    fs.appendFileSync(envPath, `${key}="${fallback}"\n`);
    process.env[key] = fallback;
    console.log(`[wobridges] Đã tự tạo biến môi trường ${key} trong .env`);
  };

  ensureEnv("DATABASE_URL", "file:./prod.db");
  ensureEnv("SESSION_SECRET", randomBytes(32).toString("hex"));

  // Chỉ tự khởi tạo database ở môi trường production (trên hosting).
  // Ở máy local, database đã được tạo sẵn khi phát triển.
  if (process.env.NODE_ENV !== "production") return;

  const node = `"${process.execPath}"`;
  const prismaCli = path.join(root, "node_modules", "prisma", "build", "index.js");
  try {
    console.log("[wobridges] Kiểm tra và tạo bảng database…");
    execSync(`${node} "${prismaCli}" db push --skip-generate`, {
      cwd: root,
      stdio: "inherit",
      env: process.env,
    });
    console.log("[wobridges] Kiểm tra tài khoản admin + bài tập mẫu…");
    execSync(`${node} "${path.join(root, "prisma", "seed.mjs")}"`, {
      cwd: root,
      stdio: "inherit",
      env: process.env,
    });
    console.log("[wobridges] Khởi tạo hoàn tất — website sẵn sàng.");
  } catch (err) {
    console.error("[wobridges] Khởi tạo database thất bại:", err);
  }
}
