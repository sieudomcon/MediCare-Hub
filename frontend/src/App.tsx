// App.tsx
// File gốc của React. Khi dự án có nhiều trang, thay Home ở đây bằng
// React Router (package.json đã có react-router-dom, chỉ cần wire vào
// main.tsx + định nghĩa Routes cho /login, /register, /home...).

import Home from './pages/home';

function App() {
  return <Home />;
}

export default App;
