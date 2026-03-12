// =============================================
// Finish Signup Page — Step 3: Completion
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    var displayArea = document.getElementById('display_data');
    var userData = getCurrentUser();
    var successLink = document.querySelector('a[href="/index.html"]');
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
        var redirectUrl = (userData && userData.position === 'trainer') ? 'trainer_profile.html' : '/index.html';
        displayArea.innerHTML = "\n            <h2 class=\"text-2xl font-bold text-white mb-4\">\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!</h2>\n            <p class=\"text-white text-lg\">\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E2A\u0E39\u0E48 GymHub!</p>\n            <p class=\"text-gray-400 text-sm mt-4\">\u0E04\u0E38\u0E13\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E2B\u0E19\u0E49\u0E32\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E44\u0E14\u0E49\u0E40\u0E25\u0E22</p>\n            <div class=\"mt-6\">\n                <a href=\"".concat(redirectUrl, "\" class=\"bg-[#ff8c00] text-black py-2 px-4 rounded-md hover:bg-[#ff8c00]/90 font-bold\">\u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01</a>\n            </div>\n        ");
    }
});
