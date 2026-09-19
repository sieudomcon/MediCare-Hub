// controllers/auth.controller.js
// Chứa logic xử lý: đăng ký user, đăng nhập, mã hóa password...

const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase.config');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 10;

// UC001 - Đăng ký
const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body || {};

    // Bước 4 (4a): kiểm tra các trường bắt buộc
    if (
      typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || !password ||
      typeof confirmPassword !== 'string' || !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
    }

    // Bước 5 (5a): email hợp lệ
    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res
        .status(400)
        .json({ message: 'Email không hợp lệ hoặc đã được đăng ký' });
    }

    // Mật khẩu tối thiểu 8 ký tự (theo placeholder trên form của SRS)
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .json({ message: 'Mật khẩu phải có tối thiểu 8 ký tự' });
    }

    // Bước 6 (6a): mật khẩu xác nhận khớp
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Mật khẩu xác nhận không khớp' });
    }

    // Bước 5 (5a): email chưa tồn tại
    const { data: existing, error: findError } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();
    if (findError) throw findError;
    if (existing) {
      return res
        .status(409)
        .json({ message: 'Email không hợp lệ hoặc đã được đăng ký' });
    }

    // Bước 7: mã hóa mật khẩu và lưu vào CSDL (role mặc định PATIENT)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({ email: normalizedEmail, password_hash: passwordHash })
      .select('id, email, role, created_at')
      .single();

    if (insertError) {
      // 23505 = vi phạm UNIQUE (2 người đăng ký cùng email cùng lúc)
      if (insertError.code === '23505') {
        return res
          .status(409)
          .json({ message: 'Email không hợp lệ hoặc đã được đăng ký' });
      }
      throw insertError;
    }

    // Bước 8: báo thành công (bước 9 chuyển trang là việc của FE)
    return res
      .status(201)
      .json({ message: 'Đăng ký thành công', user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Lỗi server', error: error.message });
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