// App.tsx
// File gốc của React. Sau này gắn Router + các Page vào đây.

import React, { useState, useEffect } from 'react';
import Home from './pages/home';       
import Login from './pages/login';       
import Register from './pages/register'; 
import Logout from './pages/logout'; 

export default function App() {
 
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Hàm chuyển trang mượt mà không cần load lại trình duyệt
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <div>
      {/* Trang chủ (Hiển thị khi đường dẫn là '/' hoặc '/home') */}
      {(currentPath === '/' || currentPath === '/home') && (
        <Home 
          onNavigateToBooking={() => navigateTo('/login')}      
          onNavigateToLogin={() => navigateTo('/login')}
          onNavigateToRegister={() => navigateTo('/register')}
        />
      )}

      {/* Trang đăng nhập */}
      {currentPath === '/login' && (
        <Login 
          onSwitchToRegister={() => navigateTo('/register')} 
        />
      )}

      {/* Trang đăng ký */}
      {currentPath === '/register' && (
        <Register 
          onSwitchToLogin={() => navigateTo('/login')} 
        />
      )}

      {/* Trang đăng xuất */}
      {currentPath === '/logout' && (
        <Logout 
          isOpen={true} 
          onClose={() => navigateTo('/')} 
          onConfirm={() => {
            // Xử lý logic xóa token/phiên đăng nhập ở đây nếu có
            localStorage.removeItem('userInfo');
            navigateTo('/login');
          }} 
        />
      )}
    </div>
  );
}
