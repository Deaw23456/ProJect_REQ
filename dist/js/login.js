function Userlogin(event) {
    event.preventDefault(); // Prevent default form submission
    var usernameEl = document.getElementById('user_Name');
    var passwordEl = document.getElementById('pass');
    if (!usernameEl || !passwordEl) {
        alert("ไม่พบช่องกรอกข้อมูล กรุณาตรวจสอบอีกครั้ง");
        return;
    }
    var username = usernameEl.value;
    var password = passwordEl.value;
    if (!username || !password) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }
    // ดึงข้อมูลผู้ใช้จาก localStorage (key: 'userData')
    var userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
        var userData = JSON.parse(userDataStr);
        // ตรวจสอบ Username และ Password
        if (userData.username === username && userData.password === password) {
            alert("เข้าสู่ระบบสำเร็จ");
            window.location.href = 'index.html';
        }
        else {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    }
    else {
        alert("ไม่พบข้อมูลผู้ใช้ กรุณาสมัครสมาชิกก่อน");
    }
}
// ทำให้ฟังก์ชันเรียกใช้ได้จาก HTML
window.Userlogin = Userlogin;
