interface UserData {
    username: string;
    email: string;
    password?: string; // Password might not be stored in all contexts or might be hashed
    fullname?: string;
    age?: number;
    gender?: string;
    position?: 'member' | 'trainer';
    phone?: string;
    weight?: number;
    height?: number;
    profileImg?: string;
    profileBackgroundImg?: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const usernameEl = document.getElementById('userName') as HTMLInputElement;
    const passwordEl = document.getElementById('pass') as HTMLInputElement;
    const loginButton = document.getElementById('login-button');

    if (!usernameEl || !passwordEl || !loginButton) {
        console.error("Login elements not found.");
        return;
    }

    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = usernameEl.value.trim();
        const password = passwordEl.value.trim();

        if (!username || !password) {
            alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
            return;
        }

        const registeredUsersString = localStorage.getItem('registeredUsers');
        const registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];

        const foundUser = registeredUsers.find(user => user.username === username && user.password === password);

        if (foundUser) {
            // Store current logged-in user data (excluding password for security if not needed)
            const currentUserData: UserData = { ...foundUser };
            delete currentUserData.password; // Remove password before storing in userData
            localStorage.setItem('userData', JSON.stringify(currentUserData));
            alert("เข้าสู่ระบบสำเร็จ!");
            window.location.href = '/index.html'; // Redirect to home page
        } else {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    });
});