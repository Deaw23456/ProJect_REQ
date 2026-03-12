"use strict";
// =============================================
// Signup Page — Step 1: Account Info
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const usernameEl = document.getElementById('user_Name');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('pass');
    const confirmPasswordEl = document.getElementById('confirm_pass');
    
    // 🎯 (เพิ่มใหม่) ดึงค่าจากช่องเลือก Role (ต้องมี input เช่น select หรือ radio ที่มี id="user_role" ใน HTML)
    const roleEl = document.getElementById('user_role'); 
    
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
            
            // 🎯 (เพิ่มใหม่) กำหนดค่า Role ถ้าหา id="user_role" ไม่เจอ จะให้เป็น member ไว้ก่อน
            const role = roleEl ? roleEl.value : 'member';

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
                password: password,
                role: role // 🎯 บันทึก Role ลงไปด้วย เพื่อให้หน้าอื่นรู้ว่าเป็นใคร
            };
            
            // บันทึกข้อมูลชั่วคราวลง localStorage
            localStorage.setItem('temp_signup', JSON.stringify(tempUserData));
            
            // 🎯 แยก Flow การทำงานตรงนี้
            if (role === 'trainer') {
                // ถ้าสมัครเป็นเทรนเนอร์ ให้ข้ามไปหน้า Set Up Profile เลย
                window.location.href = 'setup_trainer_profile.html';
            } else {
                // ถ้าเป็นสมาชิกปกติ ให้ไปหน้ากรอกข้อมูลร่างกาย
                window.location.href = 'data_detail.html';
            }
        });
    }
});