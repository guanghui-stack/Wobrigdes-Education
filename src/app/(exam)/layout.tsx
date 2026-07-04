export default function ExamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Phòng thi: không header/footer marketing để học viên tập trung tối đa
  return <main className="flex-1">{children}</main>;
}
