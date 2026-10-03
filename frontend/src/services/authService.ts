// services/authService.ts
// Các hàm liên quan đến phiên đăng nhập, dùng chung cho Navbar, các trang cần check login...

import api from './api';

const TOKEN_KEY = 'token';

// Đã đăng nhập hay chưa - chỉ cần kiểm tra có token trong localStorage không.
// (Không giải mã token ở đây, việc đó để backend xử lý khi gọi API.)
export const isLoggedIn = (): boolean => {
  return Boolean(localStorage.getItem(TOKEN_KEY));
};

// Gọi API đăng xuất (UC003) rồi xóa token khỏi trình duyệt.
// Luôn xóa token ở bước finally dù API lỗi hay thành công, vì với người dùng
// thì bấm "Đăng xuất" nghĩa là họ muốn thoát ngay, không nên giữ họ kẹt lại
// màn hình cũ chỉ vì mất mạng lúc gọi API.
export const logout = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await api.post('/auth/logout');
    return { success: true, message: res.data?.message || 'Đăng xuất thành công' };
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Không thể kết nối tới máy chủ';
    return { success: false, message };
  } finally {
    localStorage.removeItem(TOKEN_KEY);
  }
};
