
// App.tsx
// File gốc của React. Giữ trạng thái đăng nhập (user) và điều hướng giữa các trang.

import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import type { AuthUser } from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Logout from './pages/logout';
import api from './services/api';

// Chỉ coi là đã đăng nhập khi có cả token lẫn userInfo
const getStoredUser = (): AuthUser | null => {
  if (!localStorage.getItem('token')) return null;
  try {
    const raw = localStorage.getItem('userInfo');
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

// Mỗi lần mở web mới (tab mới / chạy lại) luôn bắt đầu ở trạng thái khách:
// xóa phiên cũ còn sót trong localStorage. Bấm F5 trong cùng tab thì vẫn giữ đăng nhập.
const getInitialUser = (): AuthUser | null => {
  if (!sessionStorage.getItem('appStarted')) {
    sessionStorage.setItem('appStarted', '1');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    return null;
  }
  return getStoredUser();
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Mở web: nếu có token thì hỏi backend GET /api/auth/me xem còn hợp lệ không
  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    let cancelled = false;
    api
      .get('/auth/me')
      .then((res) => {
        if (cancelled || !res.data?.user) return;
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        setUser(res.data.user);
      })
      .catch((err) => {
        // 401: token hết hạn / bị thu hồi / tài khoản bị khóa -> xóa phiên
        if (!cancelled && err?.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          setUser(null);
        }
        // lỗi mạng: giữ nguyên phiên lưu ở client
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Đã đăng nhập thì không vào /login, /register; chưa đăng nhập thì không có /logout
  useEffect(() => {
    if (user && (currentPath === '/login' || currentPath === '/register')) {
      navigateTo('/');
    }
    if (!user && currentPath === '/logout') {
      navigateTo('/login');
    }
  }, [user, currentPath]);

  // login.tsx đã lưu token + userInfo vào localStorage rồi mới gọi hàm này
  const handleLoginSuccess = () => {
    setUser(getStoredUser());
    navigateTo('/');
  };

  const handleBooking = () => {
    if (!user) {
      navigateTo('/login');
      return;
    }
    alert('Chức năng đặt lịch khám đang được phát triển.');
  };

  const showHome = currentPath === '/' || currentPath === '/home' || currentPath === '/logout';

  return (
    <div>
      {/* Trang chủ; ở /logout thì popup xác nhận đè lên trang chủ */}
      {showHome && (
        <Home
          user={user}
          onNavigateToBooking={handleBooking}
          onNavigateToLogin={() => navigateTo('/login')}
          onNavigateToRegister={() => navigateTo('/register')}
          onNavigateToLogout={() => navigateTo('/logout')}
        />
      )}

      {currentPath === '/login' && !user && (
        <Login
          onSwitchToRegister={() => navigateTo('/register')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentPath === '/register' && !user && (
        <Register onSwitchToLogin={() => navigateTo('/login')} />
      )}

      {currentPath === '/logout' && user && (
        <Logout
          isOpen={true}
          onClose={() => navigateTo('/')}
          onConfirm={() => {
            // logout.tsx đã gọi API + xóa token/userInfo, ở đây chỉ cập nhật state
            setUser(null);
            navigateTo('/login');
          }}
        />
      )}
    </div>
  );
}