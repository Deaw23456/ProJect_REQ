"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailOrUsername = emailInput.value.trim();
            const password = passwordInput.value.trim();
            if (!emailOrUsername || !password) {
                alert("กรุณากรอกอีเมล/Username และรหัสผ่าน");
                return;
            }
            // 1. ตรวจสอบสิทธิ์ Admin (Hardcoded)
            if (emailOrUsername === 'admin' && password === 'admin1234') {
                const adminUser = {
                    username: 'Admin',
                    email: 'admin@gymhub.com',
                    position: 'admin',
                    fullname: 'System Administrator',
                    profileImg: '../img/Image-11 สำเนา.jpg'
                };
                setCurrentUser(adminUser);
                alert("เข้าสู่ระบบ Admin สำเร็จ!");
                window.location.href = 'admin_page.html';
                return;
            }
            // 2. ตรวจสอบสิทธิ์ User ทั่วไปจาก LocalStorage
            const users = getRegisteredUsers();
            const foundUser = users.find((u) => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password);
            if (foundUser) {
                // Do not store password in the current user session
                const { password, ...userToStore } = foundUser;
                setCurrentUser(userToStore);
                alert(`ยินดีต้อนรับคุณ ${foundUser.username}`);
                window.location.href = foundUser.position === 'trainer' ? './trainer_dashboard.html' : './main_profile.html';
            }
            else {
                alert("อีเมล/Username หรือรหัสผ่านไม่ถูกต้อง");
            }
        });
    }
});
//# sourceMappingURL=../../data/login.js.map