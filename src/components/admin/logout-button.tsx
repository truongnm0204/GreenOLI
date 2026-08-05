'use client';

import { LogOut } from 'lucide-react';

/**
 * Nút "Đăng xuất" hiển thị ở header admin (mọi trang).
 * Dùng route logout chuẩn của Payload (/admin/logout) — route này xóa
 * session cookie phía server rồi redirect về trang đăng nhập, nên bấm
 * đăng xuất là thoát hẳn, không còn vào lại được admin.
 */
export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = '/admin/logout';
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:border-error/40 hover:bg-error/5 hover:text-error"
      title="Đăng xuất"
    >
      <LogOut className="size-3.5" />
      Đăng xuất
    </button>
  );
}
