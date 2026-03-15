"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // 1. ตรวจสอบสิทธิ์การเข้าถึง (Authentication Check)
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.position !== 'admin') {
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาเข้าสู่ระบบในฐานะ Admin");
        window.location.href = './login.html';
        return;
    }
    // 2. แสดงข้อมูล Admin ใน Sidebar ให้สอดคล้องกับคนที่ Login
    const adminNameEl = document.getElementById('admin-sidebar-name');
    const adminImgEl = document.getElementById('admin-sidebar-img');
    if (adminNameEl) {
        adminNameEl.textContent = currentUser.username || 'Admin';
    }
    // ถ้ามีรูปโปรไฟล์ให้แสดงรูปนั้น (ถ้าไม่มีใช้รูป Default ใน HTML)
    if (adminImgEl && currentUser.profileImg) {
        adminImgEl.src = currentUser.profileImg;
    }
});
//# sourceMappingURL=../../data/admin.js.map