// =============================================
// Login Page Logic — GymHub
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
    var loginButton = document.getElementById('login-button');
    var usernameInput = document.getElementById('userName');
    var passwordInput = document.getElementById('pass');
    if (!loginButton || !usernameInput || !passwordInput) {
        console.error('Login form elements not found!');
        return;
    }
    loginButton.addEventListener('click', function () {
        var username = usernameInput.value.trim();
        var password = passwordInput.value.trim();
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }
        var registeredUsers = getRegisteredUsers();
        var foundUser = registeredUsers.find(function (user) { return user.username === username && user.password === password; });
        if (foundUser) {
            // Login successful
            var currentUserData = __assign({}, foundUser);
            delete currentUserData.password; // Don't store password in current session
            setCurrentUser(currentUserData);
            alert("Welcome back, ".concat(foundUser.username, "!"));
            // Redirect based on position
            if (foundUser.position === 'trainer') {
                window.location.href = 'trainer_profile.html';
            }
            else {
                window.location.href = '/index.html';
            }
        }
        else {
            // Login failed
            alert('Invalid username or password.');
        }
    });
});
