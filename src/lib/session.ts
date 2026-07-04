import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@/lib/db";

const COOKIE_NAME = "wb_session";
const SESSION_DAYS = 7;

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Thiếu biến môi trường SESSION_SECRET");
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  userId: string;
  role: "STUDENT" | "ADMIN";
};

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, secretKey());
    if (!payload.userId) return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
});

/** Người dùng hiện tại (đã xác minh còn tồn tại và đang hoạt động trong DB). */
export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  const user = await db.user.findUnique({ where: { id: session.userId } });
  if (!user || !user.active) return null;
  return user;
});

/** Bắt buộc đăng nhập — chưa đăng nhập thì chuyển tới trang đăng nhập. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/dang-nhap");
  return user;
}

/** Bắt buộc quyền quản trị. */
export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/hoc-vien");
  return user;
}
