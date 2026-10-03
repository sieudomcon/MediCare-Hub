// config/supabase.config.js
// Ket noi toi Supabase. Backend dung SERVICE ROLE KEY nen bo qua RLS -> bat
// buoc phai bat RLS cho bang users de client khong doc truc tiep duoc bang nay.

const { createClient } = require('@supabase/supabase-js');
const { env } = require('./env.config');

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

module.exports = supabase;
