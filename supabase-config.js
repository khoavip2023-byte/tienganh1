/* ==========================================================
   CẤU HÌNH KẾT NỐI SUPABASE & LOGIC DÙNG CHUNG
   Dự án: tienganhthatvui.com
   ========================================================== */

// 1. Thông tin kết nối Supabase
const SUPABASE_URL = "https://cafevcfsoabxvtralomc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RJq7Z9XLRg-HLaKZXPPdeQ_GWF0UtUF";

// Khởi tạo Supabase Client
// Lưu ý: Tệp index.html phải nhúng thư viện Supabase JS SDK trước tệp config.js này
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Tính số ngày còn hạn học phí
 * @param {string} expiredAtStr - Chuỗi ngày hết hạn (ISO format)
 * @returns {number} Số ngày còn lại (Âm là đã quá hạn)
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
 * Xác định trạng thái học sinh áp dụng cho giao diện Giáo viên:
 * - 'ACTIVE': Bình thường
 * - 'GREYED_OUT': Trễ phí từ 1 đến 7 ngày (Làm xám dòng)
 * - 'HIDDEN': Trễ phí > 7 ngày HOẶC đã bị Admin ẩn (is_deleted = true)
 */
function getStudentStatusForTeacher(student) {
    if (student.is_deleted) return 'HIDDEN';
    
    const daysLeft = getDaysRemaining(student.expired_at);
    if (daysLeft < -7) {
        return 'HIDDEN';      // Quá hạn > 7 ngày -> Ẩn hoàn toàn khỏi bảng điểm
    } else if (daysLeft < 0 && daysLeft >= -7) {
        return 'GREYED_OUT';  // Trễ từ 1-7 ngày -> Làm xám tên kèm cảnh báo
    }
    return 'ACTIVE';          // Còn hạn -> Hiển thị bình thường
}