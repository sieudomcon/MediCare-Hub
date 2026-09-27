# Quan Ly Phong Kham - Group10

Du an quan ly phong kham. Cong nghe su dung:
- **Frontend:** React + TypeScript (Vite)
- **Backend:** Node.js + Express.js
- **Database:** Supabase
- **Editor:** VS Code

## Cau truc thu muc

```
Quan_Ly_Phong_Kham_Group10/
├── backend/         <-- Tui lam API (Node.js/Express) chui vao day
│   ├── src/
│   │   ├── config/        (File cau hinh Supabase, chuoi ket noi DB)
│   │   ├── controllers/   (Logic xu ly: tao user, dat lich, ma hoa pass...)
│   │   ├── middlewares/   (File check token JWT dang nhap)
│   │   ├── routes/        (Khai bao duong dan API: /api/auth/login...)
│   │   ├── utils/         (Cac ham dung chung: format ngay thang, tao token...)
│   │   └── server.js      (File goc de chay server backend)
│   ├── .env.example
│   └── package.json
│
├── frontend/        <-- Tui lam Giao dien (React) chui vao day
│   ├── src/
│   │   ├── assets/         (Anh, icon, file CSS chung)
│   │   ├── components/     (Cac cuc UI dung lai nhieu lan)
│   │   ├── pages/           (Cac trang to: LoginPage, RegisterPage...)
│   │   ├── services/        (File goi API tu backend)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   └── package.json
│
└── .gitignore        (File chan day rac len Git - AE KHONG DUNG VAO)
```

## Cach chay du an (local)

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env     # roi dien key Supabase, JWT_SECRET that vao
npm run dev
```
Server mac dinh chay o `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend mac dinh chay o `http://localhost:3000`

## Quy uoc lam viec (goi y)
- Moi nguoi tao branch rieng theo module (`feature/dang-nhap`, `feature/dat-lich`...), khong push thang len `main`.
- Dat ten commit ro rang, vd: `feat: them API dang ky user`.
- Nho khong bao gio push file `.env` that len Git (da chan san trong `.gitignore`).
