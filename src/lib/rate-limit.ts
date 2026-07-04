/**
 * Rate-limit in-memory theo IP (sliding window đơn giản).
 * Chống spam contact form ở quy mô landing page. Reset khi restart process
 * (chấp nhận cho landing page — YAGNI, chưa cần Redis/DB).
 */

type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();

const WINDOW_MS = 60_000; // 1 phút
const MAX_HITS = 5; // tối đa 5 lần gửi / phút / IP

/**
 * Trả true nếu IP còn trong hạn mức (cho phép), false nếu vượt (chặn).
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const hit = store.get(ip);

  if (!hit || now > hit.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (hit.count >= MAX_HITS) return false;

  hit.count += 1;
  return true;
}
