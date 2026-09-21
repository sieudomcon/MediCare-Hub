// utils/helper.js
// Cac ham dung chung trong toan bo backend: format ngay thang, tao token...

const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config');

// Format ngay thang kieu dd/mm/yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Tao JWT token cho phien dang nhap (UC002 - buoc 7)
const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

module.exports = { formatDate, generateToken };
