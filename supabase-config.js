// =================================================================
// FILE CẤU HÌNH KẾT NỐI SUPABASE (SYSTEM BRIDGE)
// Website: tienganhthatvui.com
// =================================================================

// 1. Link Kết Nối Dự Án Supabase (Đã được ghép từ Project ID: cafevcfsoabxvtralomc)
const SUPABASE_URL = 'https://cafevcfsoabxvtralomc.supabase.co';

// 2. Chìa Khóa API Public (Anon Key)
const SUPABASE_ANON_KEY = 'sb_publishable_RJq7Z9XLRg-HLaKZXPPdeQ_GWF0UtUF';

// 3. Khởi tạo kết nối dùng chung cho toàn bộ các file (index.html, hocsinh.html, teacher.html, admin.html)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);