import { UserRoundCheck, UserRoundX } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { toggleUserActiveAction } from "@/lib/actions/admin";
import { ResetPasswordForm } from "@/components/admin/reset-password-form";

export const metadata = { title: "Quản lý học viên" };

function fmt(d: Date) {
  return d.toLocaleDateString("vi-VN");
}

export default async function AdminStudentsPage() {
  await requireAdmin();
  const students = await db.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { attempts: true } } },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="label-caps">Danh sách</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">
        Quản lý học viên
      </h1>
      <div className="rule-gold mt-5" />
      <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
        Học viên tự đăng ký bằng email. Bạn có thể khóa tài khoản bất thường
        hoặc đặt lại mật khẩu khi học viên quên (nhớ báo mật khẩu mới cho học
        viên qua Zalo/điện thoại).
      </p>

      {students.length === 0 ? (
        <p className="mt-10 border border-line bg-paper p-8 text-center text-ink-soft">
          Chưa có học viên nào đăng ký.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border border-line font-ui text-sm">
            <thead>
              <tr className="bg-navy text-paper">
                <th className="px-4 py-3 text-left font-semibold">Họ tên</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-center font-semibold">Ngày đăng ký</th>
                <th className="px-4 py-3 text-center font-semibold">Bài đã làm</th>
                <th className="px-4 py-3 text-center font-semibold">Trạng thái</th>
                <th className="px-4 py-3 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {students.map((s) => (
                <tr key={s.id} className={s.active ? "bg-paper" : "bg-cream opacity-70"}>
                  <td className="px-4 py-3 font-semibold text-ink">{s.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{s.email}</td>
                  <td className="px-4 py-3 text-center tabular-nums text-ink-soft">
                    {fmt(s.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums text-ink-soft">
                    {s._count.attempts}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.active ? (
                      <span className="border border-success bg-success-pale px-2 py-0.5 text-xs font-semibold text-success">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="border border-danger bg-danger-pale px-2 py-0.5 text-xs font-semibold text-danger">
                        Đã khóa
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <ResetPasswordForm userId={s.id} userEmail={s.email} />
                      <form action={toggleUserActiveAction.bind(null, s.id)}>
                        <button
                          type="submit"
                          title={s.active ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                          className={`flex h-9 w-9 cursor-pointer items-center justify-center border border-line transition-colors ${
                            s.active
                              ? "text-ink-soft hover:border-danger hover:text-danger"
                              : "text-success hover:border-success"
                          }`}
                        >
                          {s.active ? (
                            <UserRoundX className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <UserRoundCheck className="h-4 w-4" aria-hidden="true" />
                          )}
                          <span className="sr-only">
                            {s.active ? "Khóa" : "Mở khóa"}
                          </span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
