// config/supabase.config.js
// File này chứa cấu hình kết nối tới Supabase (hoặc DB khác nếu nhóm đổi ý sau này).
// Nhớ: copy .env.example -> .env rồi điền SUPABASE_URL, SUPABASE_KEY thật vào.

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('[config] Thiếu SUPABASE_URL hoặc SUPABASE_KEY trong file .env');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
