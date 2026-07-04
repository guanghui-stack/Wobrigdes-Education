"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

export type AccountFormState = { error?: string; success?: string } | undefined;

/** Người dùng (học viên hoặc admin) tự đổi mật khẩu của mình. */
export async function changePasswordAction(
  _prev: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const user = await requireUser();

  const current = String(formData.get("current") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!(await bcrypt.compare(current, user.passwordHash))) {
    return { error: "Mật khẩu hiện tại không đúng." };
  }
  if (password.length < 8) {
    return { error: "Mật khẩu mới cần tối thiểu 8 ký tự." };
  }
  if (password === current) {
    return { error: "Mật khẩu mới phải khác mật khẩu hiện tại." };
  }
  if (password !== confirm) {
    return { error: "Mật khẩu nhập lại không khớp." };
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(password, 10) },
  });

  return { success: "Đã đổi mật khẩu thành công. Hãy dùng mật khẩu mới từ lần đăng nhập sau." };
}
