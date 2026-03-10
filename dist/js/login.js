"use strict";
// =============================================
// Login Page Logic — GymHub
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('pass');
    if (!loginButton || !usernameInput || !passwordInput) {
        console.error('Login form elements not found!');
        return;
    }
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }
        const registeredUsers = getRegisteredUsers();
        const foundUser = registeredUsers.find(user => user.username === username && user.password === password);
        if (foundUser) {
            // Login successful
            const currentUserData = { ...foundUser };
            delete currentUserData.password; // Don't store password in current session
            setCurrentUser(currentUserData);
            alert(`Welcome back, ${foundUser.username}!`);
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
//# sourceMappingURL=../../data/login.js.map