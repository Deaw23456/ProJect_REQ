document.addEventListener('DOMContentLoaded', function () {
    var loginBtn = document.getElementById('login-button');
    var usernameInput = document.getElementById('userName');
    var passwordInput = document.getElementById('pass');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var username = usernameInput.value.trim();
            var password = passwordInput.value.trim();
            if (!username || !password) {
                alert("กรุณากรอก Username และ Password");
                return;
            }
            // 1. ตรวจสอบสิทธิ์ Admin (Hardcoded)
            if (username === 'admin' && password === 'admin1234') {
                var adminUser = {
                    username: 'Admin',
                    email: 'admin@gymhub.com',
                    position: 'admin',
                    fullname: 'System Administrator',
                    profileImg: '../img/Image-11 สำเนา.jpg'
                };
                setCurrentUser(adminUser);
                alert("เข้าสู่ระบบ Admin สำเร็จ!");
                window.location.href = './admin_page.html';
                return;
            }
            // 2. ตรวจสอบสิทธิ์ User ทั่วไปจาก LocalStorage
            var users = getRegisteredUsers();
            var foundUser = users.find(function (u) { return u.username === username && u.password === password; });
            if (foundUser) {
                setCurrentUser(foundUser);
                alert("\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E04\u0E38\u0E13 ".concat(foundUser.username));
                window.location.href = foundUser.position === 'trainer' ? './trainer_dashboard.html' : './main_profile.html';
            }
            else {
                alert("Username หรือ Password ไม่ถูกต้อง");
            }
        });
    }
});
