// =============================================
// Login Page
// =============================================
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
document.addEventListener('DOMContentLoaded', function () {
    var usernameEl = document.getElementById('userName');
    var passwordEl = document.getElementById('pass');
    var loginButton = document.getElementById('login-button');
    if (!usernameEl || !passwordEl || !loginButton) {
        console.error("Login elements not found.");
        return;
    }
    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        var username = usernameEl.value.trim();
        var password = passwordEl.value.trim();
        if (!username || !password) {
            alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
            return;
        }
        // ===== Admin Login =====
        if (username === 'admin' && password === 'admin1234') {
            var adminUser = {
                username: 'admin',
                email: 'admin@gymhub.com',
                position: 'admin',
                fullname: 'Administrator'
            };
            setCurrentUser(adminUser);
            alert("เข้าสู่ระบบสำเร็จ! (Admin)");
            window.location.href = 'page/admin_page.html';
            return;
        }
        // ===== Regular User Login =====
        var registeredUsers = getRegisteredUsers();
        var foundUser = registeredUsers.find(function (user) { return user.username === username && user.password === password; });
        if (foundUser) {
            // Store current user (exclude password)
            var currentUserData = __assign({}, foundUser);
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
