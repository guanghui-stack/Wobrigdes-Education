"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LogIn, UserRoundPlus } from "lucide-react";
import { loginAction, registerAction } from "@/lib/actions/auth";
import { Field, ErrorBanner, SubmitButton } from "@/components/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="space-y-5">
      <ErrorBanner message={state?.error} />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="ban@email.com"
      />
      <Field
        label="Mật khẩu"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="••••••••"
      />
      <SubmitButton disabled={pending} className="w-full">
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {pending ? "Đang đăng nhập…" : "Đăng nhập"}
      </SubmitButton>
      <p className="text-center font-ui text-sm text-ink-soft">
        Chưa có tài khoản?{" "}
        <Link
          href="/dang-ky"
          className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
        >
          Đăng ký miễn phí
        </Link>
      </p>
      <p className="text-center font-ui text-xs text-muted">
        Quên mật khẩu? Liên hệ trung tâm qua hotline 0901 234 567 để được cấp lại.
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, undefined);
  return (
    <form action={action} className="space-y-5">
      <ErrorBanner message={state?.error} />
      <Field
        label="Họ và tên"
        name="name"
        required
        autoComplete="name"
        placeholder="Nguyễn Văn A"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="ban@email.com"
        hint="Email là tên đăng nhập và nơi nhận thông báo kết quả chấm bài."
      />
      <Field
        label="Mật khẩu"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        placeholder="Tối thiểu 8 ký tự"
      />
      <Field
        label="Nhập lại mật khẩu"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
        placeholder="Nhập lại mật khẩu"
      />
      <SubmitButton disabled={pending} variant="gold" className="w-full">
        <UserRoundPlus className="h-4 w-4" aria-hidden="true" />
        {pending ? "Đang tạo tài khoản…" : "Tạo tài khoản học viên"}
      </SubmitButton>
      <p className="text-center font-ui text-sm text-ink-soft">
        Đã có tài khoản?{" "}
        <Link
          href="/dang-nhap"
          className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
        >
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
