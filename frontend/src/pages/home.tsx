// pages/home.tsx
// Sửa sự cố #1 (UC003 thiếu điểm kích hoạt trên UI):
// Navbar giờ kiểm tra trạng thái đăng nhập (đọc token trong localStorage qua
// authService.isLoggedIn), đăng nhập rồi thì đổi "Đăng nhập/Đăng ký" thành
// nút "Đăng xuất", bấm vào mở modal xác nhận (LogoutConfirmModal) đúng mock
// UI UC003, xác nhận xong mới thật sự gọi API /auth/logout.

import { useEffect, useState } from 'react';
import { isLoggedIn } from '../services/authService';
import LogoutConfirmModal from '../components/LogoutConfirmModal';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Check lúc trang vừa load (ví dụ người dùng F5 lại, token vẫn còn trong
  // localStorage từ lần đăng nhập trước đó).
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogoutConfirmed = () => {
    setShowLogoutModal(false);
    // Dùng điều hướng full reload (chưa có BrowserRouter trong main.tsx) để
    // chắc chắn toàn bộ state cũ (kể cả state trong các component khác) bị
    // xóa sạch, không còn sót dữ liệu của phiên đăng nhập cũ.
    // TODO: khi dự án gắn React Router thật, đổi thành useNavigate('/login').
    window.location.href = '/login';
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <span style={styles.brand}>MediCare Hub</span>

        {loggedIn ? (
          <button style={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
            Đăng xuất
          </button>
        ) : (
          <div style={styles.authLinks}>
            <a href="/login" style={styles.link}>
              Đăng nhập
            </a>
            <a href="/register" style={styles.link}>
              Đăng ký
            </a>
          </div>
        )}
      </nav>

      <main style={styles.content}>
        <h1>Quan Ly Phong Kham - Group10</h1>
        <p>Frontend skeleton da san sang, bat dau code thoi AE oi!</p>
      </main>

      <LogoutConfirmModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirmed={handleLogoutConfirmed}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    borderBottom: '1px solid #eee',
  },
  brand: { fontWeight: 700, fontSize: 18 },
  authLinks: { display: 'flex', gap: 16 },
  link: { color: '#1a73e8', textDecoration: 'none' },
  logoutBtn: {
    padding: '8px 16px',
    borderRadius: 6,
    border: '1px solid #c62828',
    background: '#fff',
    color: '#c62828',
    cursor: 'pointer',
  },
  content: { padding: 24 },
};

export default Home;
