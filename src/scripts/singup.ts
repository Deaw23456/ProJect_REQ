// =============================================
// Signup Page — Step 1: Account Info
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const usernameEl = document.getElementById('user_Name') as HTMLInputElement;
    const emailEl = document.getElementById('email') as HTMLInputElement;
    const passwordEl = document.getElementById('pass') as HTMLInputElement;
    const confirmPasswordEl = document.getElementById('confirm_pass') as HTMLInputElement;
    const nextButton = document.getElementById('next-button');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (!usernameEl || !emailEl || !passwordEl || !confirmPasswordEl) {
                alert("ไม่พบช่องกรอกข้อมูล กรุณาตรวจสอบอีกครั้ง");
                return;
            }

            const username = usernameEl.value;
            const email = emailEl.value;
            const password = passwordEl.value;
            const confirmPassword = confirmPasswordEl.value;

            if (!username || !email || !password || !confirmPassword) {
                alert("กรอกข้อมูลให้ครบทุกช่อง");
                return;
            }

            if (password !== confirmPassword) {
                alert("รหัสผ่านไม่ตรง กรุณาตรวจสอบอีกครั้ง");
                return;
            }

            // สร้างอ็อบเจ็กต์ข้อมูลผู้ใช้ชั่วคราว
            const tempUserData = {
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