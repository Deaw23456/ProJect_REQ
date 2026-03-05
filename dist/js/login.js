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
        event.preventDefault(); // Prevent default form submission
        var username = usernameEl.value.trim();
        var password = passwordEl.value.trim();
        if (!username || !password) {
            alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
            return;
        }
        var registeredUsersString = localStorage.getItem('registeredUsers');
        var registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];
        var foundUser = registeredUsers.find(function (user) { return user.username === username && user.password === password; });
        if (foundUser) {
            // Store current logged-in user data (excluding password for security if not needed)
            var currentUserData = __assign({}, foundUser);
            delete currentUserData.password; // Remove password before storing in userData
            localStorage.setItem('userData', JSON.stringify(currentUserData));
            alert("เข้าสู่ระบบสำเร็จ!");
            window.location.href = '/index.html'; // Redirect to home page
        }
        else {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    });
});
