/* ==========================================================
   CẤU HÌNH KẾT NỐI SUPABASE & LOGIC DÙNG CHUNG
   Dự án: tienganhthatvui.com
   ========================================================== */

const SUPABASE_URL = "https://cafevcfsoabxvtralomc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RJq7Z9XLRg-HLaKZXPPdeQ_GWF0UtUF";

// Khởi tạo Supabase Client
// Lưu ý: Thư viện Supabase JS SDK phải được nạp trước file config.js này trong HTML
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Tính số ngày còn lại của học phí
 * @param {string} expiredAtStr - Ngày hết hạn
 * @returns {number} Số ngày (Âm là đã quá hạn)
 */
function getDaysRemaining(expiredAtStr) {
    if (!expiredAtStr) return -999;
    const expiredDate = new Date(expiredAtStr);
    const today = new Date();
    expiredDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = expiredDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Xác định trạng thái học sinh áp dụng cho Giáo viên
 */
function getStudentStatusForTeacher(student) {
    if (student.is_deleted) return 'HIDDEN';
    
    const daysLeft = getDaysRemaining(student.expired_at);
    if (daysLeft < -7) {
        return 'HIDDEN';      // Quá hạn > 7 ngày -> Ẩn khỏi bảng điểm
    } else if (daysLeft < 0 && daysLeft >= -7) {
        return 'GREYED_OUT';  // Trễ từ 1-7 ngày -> Làm xám dòng
    }
    return 'ACTIVE';          // Bình thường
}
