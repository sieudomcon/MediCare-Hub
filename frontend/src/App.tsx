// App.tsx
// File gốc của React. Sau này gắn Router + các Page vào đây.
import React, { useState, useEffect } from 'react';
import Login from './pages/login';       
import Register from './pages/register'; 
import Logout from './pages/logout'; 

export default function App() {
  // Lấy đường dẫn hiện tại trên thanh URL trình duyệt
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Lắng nghe sự kiện khi người dùng bấm nút Tiến/Lùi trên trình duyệt
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
      {}
      {(currentPath === '/login' || currentPath === '/') && (
        <Login 
          onSwitchToRegister={() => navigateTo('/register')} 
        />
      )}

      {}
      {currentPath === '/register' && (
        <Register 
          onSwitchToLogin={() => navigateTo('/login')} 
        />
      )}

      {}
      {currentPath === '/logout' && (
        <Logout 
          isOpen={true} 
          onClose={() => navigateTo('/login')} 
          onConfirm={() => {
            
            navigateTo('/login');
          }} 
        />
      )}
    </div>
  );
}
