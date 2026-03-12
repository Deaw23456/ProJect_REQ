// อ้างอิงฟังก์ชันจาก helpers.js
declare function getRegisteredUsers(): any[];
declare function setCurrentUser(user: any): void;

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-button') as HTMLButtonElement;
    const usernameInput = document.getElementById('userName') as HTMLInputElement;
    const passwordInput = document.getElementById('pass') as HTMLInputElement;

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                alert("กรุณากรอก Username และ Password");
                return;
            }

            // 1. ตรวจสอบสิทธิ์ Admin (Hardcoded)
            if (username === 'admin' && password === 'admin1234') {
                const adminUser = {
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
            const users = getRegisteredUsers();
            const foundUser = users.find((u: any) => u.username === username && u.password === password);

            if (foundUser) {
                setCurrentUser(foundUser);
                alert(`ยินดีต้อนรับคุณ ${foundUser.username}`);
                window.location.href = foundUser.position === 'trainer' ? './trainer_dashboard.html' : './main_profile.html';
            } else {
                alert("Username หรือ Password ไม่ถูกต้อง");
            }
        });
    }
});