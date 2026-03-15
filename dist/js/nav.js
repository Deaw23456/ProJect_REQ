"use strict";
// =============================================
// Shared Navigation Logic — GymHub
// =============================================
/** เริ่มต้น navigation bar: toggle guest/user nav, dropdown menu, logout */
function initNav() {
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    const usernameDisplay = document.getElementById('username-display');
    const profileBtn = document.getElementById('profile-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const logoutBtn = document.getElementById('logout-btn');
    const navProfileImg = document.getElementById('nav-profile-img');
    const userData = getCurrentUser();
    if (userData) {
        // User is logged in
        if (guestNav)
            guestNav.classList.add('hidden');
        if (userNav)
            userNav.classList.remove('hidden');
        if (usernameDisplay)
            usernameDisplay.textContent = userData.username;
        if (navProfileImg && userData.profileImg) {
            navProfileImg.src = userData.profileImg;
        }
        // ถ้าเป็น trainer ให้ลิงก์ My Profile ไปที่ trainer_profile
        const myProfileLink = document.querySelector('#dropdown-menu a[href="/page/main_profile.html"]');
        if (myProfileLink && userData.position === 'trainer') {
            myProfileLink.href = '/page/trainer_profile.html';
        }
    }
    else {
        // User is not logged in
        if (guestNav)
            guestNav.classList.remove('hidden');
        if (userNav)
            userNav.classList.add('hidden');
        if (navProfileImg)
            navProfileImg.src = DEFAULT_PROFILE_IMG;
        if (usernameDisplay)
            usernameDisplay.textContent = '';
    }
    // Toggle dropdown menu
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            if (dropdownMenu)
                dropdownMenu.classList.toggle('hidden');
        });
    }
    // Close dropdown if clicked outside
    window.addEventListener('click', (e) => {
        if (userNav && !userNav.contains(e.target)) {
            if (dropdownMenu)
                dropdownMenu.classList.add('hidden');
        }
    });
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            removeCurrentUser();
            window.location.href = '/index.html';
        });
    }
}
//# sourceMappingURL=../../data/nav.js.map