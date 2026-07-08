import { notFound } from "next/navigation";
import { ExerciseForm } from "@/components/admin/exercise-form";

/** Trang xem thử trình tạo đề — CHỈ tồn tại ở môi trường dev. */
export const metadata = { title: "Xem thử trình tạo đề" };

export default function BuilderPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-display text-3xl font-bold text-navy-deep">
        Xem thử trình tạo đề (dev)
      </h1>
      <div className="border border-line bg-paper p-8 shadow-card">
        <ExerciseForm />
      </div>
    </section>
  );
}
