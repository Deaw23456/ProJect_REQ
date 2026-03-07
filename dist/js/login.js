"use strict";
// =============================================
// Login Page
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const usernameEl = document.getElementById('userName');
    const passwordEl = document.getElementById('pass');
    const loginButton = document.getElementById('login-button');
    if (!usernameEl || !passwordEl || !loginButton) {
        console.error("Login elements not found.");
        return;
    }
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        const username = usernameEl.value.trim();
        const password = passwordEl.value.trim();
        if (!username || !password) {
            alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
            return;
        }
        // ===== Admin Login =====
        if (username === 'admin' && password === 'admin1234') {
            const adminUser = {
                username: 'admin',
                email: 'admin@gymhub.com',
                position: 'admin',
                fullname: 'Administrator'
            };
            setCurrentUser(adminUser);
            alert("เข้าสู่ระบบสำเร็จ! (Admin)");
            window.location.href = '/page/admin_page.html';
            return;
        }
        // ===== Regular User Login =====
        const registeredUsers = getRegisteredUsers();
        const foundUser = registeredUsers.find(user => user.username === username && user.password === password);
        if (foundUser) {
            // Store current user (exclude password)
            const currentUserData = { ...foundUser };
            delete currentUserData.password;
            setCurrentUser(currentUserData);
            alert("เข้าสู่ระบบสำเร็จ!");
            window.location.href = '/index.html';
        }
        else {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    });
});
//# sourceMappingURL=../../data/login.js.map