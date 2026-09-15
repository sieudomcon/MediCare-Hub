// controllers/auth.controller.js
// Chứa logic xử lý: đăng ký user, đăng nhập, mã hóa password...
// Đây là file ví dụ, AE sửa/đổi tên theo module của nhóm nhé.

const register = async (req, res) => {
  try {
    // TODO: validate input, mã hóa password, lưu vào DB
    res.status(201).json({ message: 'Đăng ký thành công (placeholder)' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    // TODO: kiểm tra user, so sánh password, tạo JWT token
    res.status(200).json({ message: 'Đăng nhập thành công (placeholder)', token: null });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = { register, login };
