import { randomBytes } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Tự động chuẩn bị mọi thứ khi server khởi động, để người vận hành
 * không cần gõ lệnh trên hosting:
 *   1. Bảo đảm DATABASE_URL và SESSION_SECRET tồn tại (tự sinh nếu thiếu,
 *      cố gắng ghi lại vào .env; nếu không ghi được thì lưu file dự phòng
 *      trong thư mục tạm để giữ ổn định giữa các lần khởi động)
 *   2. Tạo bảng database + seed admin/bài mẫu (không cần Prisma CLI)
 */
export async function setupServer() {
  const root = process.cwd();
  const envPath = path.join(root, ".env");

  let envText = "";
  try {
    envText = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  } catch {
    /* không đọc được .env — tiếp tục với giá trị tự sinh */
  }

  const readFromEnvFile = (key: string): string | null => {
    const match = envText.match(new RegExp(`^${key}=["']?([^"'\r\n]+)`, "m"));
    return match ? match[1] : null;
  };

  const persist = (key: string, value: string) => {
    try {
      fs.appendFileSync(envPath, `${key}="${value}"\n`);
      console.log(`[wobridges] Đã lưu ${key} vào .env`);
      return;
    } catch {
      /* .env không ghi được — thử file dự phòng */
    }
    try {
      fs.writeFileSync(fallbackPath(key), value, { mode: 0o600 });
      console.log(`[wobridges] Đã lưu ${key} vào file dự phòng (thư mục tạm)`);
    } catch {
      console.warn(
        `[wobridges] Không lưu được ${key} — dùng giá trị trong bộ nhớ (sẽ đổi khi khởi động lại)`
      );
    }
  };

  const fallbackPath = (key: string) =>
    path.join(os.tmpdir(), `wobridges-${key.toLowerCase()}`);

  const readFallback = (key: string): string | null => {
    try {
      const p = fallbackPath(key);
      if (fs.existsSync(p)) return fs.readFileSync(p, "utf8").trim() || null;
    } catch {
      /* bỏ qua */
    }
    return null;
  };

  const ensureEnv = (key: string, generate: () => string) => {
    if (process.env[key]) return;
    const existing = readFromEnvFile(key) ?? readFallback(key);
    if (existing) {
      process.env[key] = existing;
      return;
    }
    const value = generate();
    process.env[key] = value;
    persist(key, value);
  };

  ensureEnv("DATABASE_URL", () => "file:./prod.db");
  ensureEnv("SESSION_SECRET", () => randomBytes(32).toString("hex"));

  // Ở máy local (npm run dev) database đã có sẵn — chỉ tự khởi tạo trên hosting.
  if (process.env.NODE_ENV !== "production") return;

  const g = globalThis as { __wobridgesInit?: string };
  try {
    console.log("[wobridges] Kiểm tra database + tài khoản admin…");
    const { initDatabase } = await import("./lib/init-db");
    await initDatabase();
    g.__wobridgesInit = "ok";
    console.log("[wobridges] Khởi tạo hoàn tất — website sẵn sàng.");
  } catch (err) {
    g.__wobridgesInit = String(err).slice(0, 500);
    console.error("[wobridges] Khởi tạo database thất bại:", err);
  }
}
