// =============================================
// Login Page
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const usernameEl = document.getElementById('userName') as HTMLInputElement;
    const passwordEl = document.getElementById('pass') as HTMLInputElement;
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

        const registeredUsers = getRegisteredUsers();
        const foundUser = registeredUsers.find(user => user.username === username && user.password === password);

        if (foundUser) {
            // Store current user (exclude password)
            const currentUserData: UserData = { ...foundUser };
            delete currentUserData.password;
            setCurrentUser(currentUserData);
            alert("เข้าสู่ระบบสำเร็จ!");
            window.location.href = '/index.html';
        } else {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    });
});