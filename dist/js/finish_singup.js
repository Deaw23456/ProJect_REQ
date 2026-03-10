"use strict";
// =============================================
// Finish Signup Page — Step 3: Completion
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const displayArea = document.getElementById('display_data');
    const userData = getCurrentUser();
    const successLink = document.querySelector('a[href="/index.html"]');
    // ถ้าเป็น trainer ให้ redirect ไป trainer_profile แทน
    if (userData && userData.position === 'trainer' && successLink) {
        successLink.href = 'trainer_profile.html';
    }
    if (userData && displayArea) {
        displayArea.classList.remove('hidden');
        // ลบข้อมูลชั่วคราว
        localStorage.removeItem('temp_signup');
        localStorage.removeItem('temp_details');
    }
    else if (displayArea) {
        // Fallback: แสดง message ถ้าไม่มี userData
        displayArea.classList.remove('hidden');
        const redirectUrl = (userData && userData.position === 'trainer') ? 'trainer_profile.html' : '/index.html';
        displayArea.innerHTML = `
            <h2 class="text-2xl font-bold text-white mb-4">สมัครสมาชิกสำเร็จ!</h2>
            <p class="text-white text-lg">ยินดีต้อนรับสู่ GymHub!</p>
            <p class="text-gray-400 text-sm mt-4">คุณสามารถไปที่หน้าโปรไฟล์ของคุณได้เลย</p>
            <div class="mt-6">
                <a href="${redirectUrl}" class="bg-[#ff8c00] text-black py-2 px-4 rounded-md hover:bg-[#ff8c00]/90 font-bold">กลับหน้าหลัก</a>
            </div>
        `;
    }
});
//# sourceMappingURL=../../data/finish_singup.js.map