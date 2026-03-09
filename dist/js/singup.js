// =============================================
// Signup Page — Step 1: Account Info
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    var usernameEl = document.getElementById('user_Name');
    var emailEl = document.getElementById('email');
    var passwordEl = document.getElementById('pass');
    var confirmPasswordEl = document.getElementById('confirm_pass');
    var nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (!usernameEl || !emailEl || !passwordEl || !confirmPasswordEl) {
                alert("ไม่พบช่องกรอกข้อมูล กรุณาตรวจสอบอีกครั้ง");
                return;
            }
            var username = usernameEl.value;
            var email = emailEl.value;
            var password = passwordEl.value;
            var confirmPassword = confirmPasswordEl.value;
            if (!username || !email || !password || !confirmPassword) {
                alert("กรอกข้อมูลให้ครบทุกช่อง");
                return;
            }
            if (password !== confirmPassword) {
                alert("รหัสผ่านไม่ตรง กรุณาตรวจสอบอีกครั้ง");
                return;
            }
            // สร้างอ็อบเจ็กต์ข้อมูลผู้ใช้ชั่วคราว
            var tempUserData = {
                username: username,
                email: email,
                password: password
            };
            // บันทึกข้อมูลชั่วคราวลง localStorage
            localStorage.setItem('temp_signup', JSON.stringify(tempUserData));
            // ไปหน้าถัดไปเพื่อกรอกข้อมูลร่างกาย
            window.location.href = 'data_detail.html';
        });
    }
});
