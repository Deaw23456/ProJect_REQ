const logInData = localStorage.getItem('temp_signup');
const logInDataObj = logInData ? JSON.parse(logInData) : null;
const logInUsername = logInDataObj?.username;
const logInPassword = logInDataObj?.password;

function Userlogin() {
    const usernameEl = document.getElementById('userName') as HTMLInputElement;
    const passwordEl = document.getElementById('pass') as HTMLInputElement;

    if (!usernameEl || !passwordEl) {
        alert("ไม่พบช่องกรอกข้อมูล กรุณาตรวจสอบอีกครั้ง");
        return;
    }

    const username = usernameEl.value;
    const password = passwordEl.value;

    if (!username || !password) {
        alert("กรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    if (username === logInUsername && password === logInPassword) {
        alert("Login successful!");
        // ไปหน้าแสดงผลรวม
        window.location.href = 'finish_singup.html';
    } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
    }
}

(window as any).Userlogin = Userlogin;