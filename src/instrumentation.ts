/**
 * Chạy MỘT LẦN khi server khởi động. Phần việc thật nằm trong
 * instrumentation-node.ts — chỉ được nạp ở môi trường Node.js
 * (tách file để không lẫn Node API vào bundle Edge).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { setupServer } = await import("./instrumentation-node");
    await setupServer();
  }
}
