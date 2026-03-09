// =============================================
// Shared Navigation Logic — GymHub
// =============================================
/** เริ่มต้น navigation bar: toggle guest/user nav, dropdown menu, logout */
function initNav() {
    var guestNav = document.getElementById('guest-nav');
    var userNav = document.getElementById('user-nav');
    var usernameDisplay = document.getElementById('username-display');
    var profileBtn = document.getElementById('profile-btn');
    var dropdownMenu = document.getElementById('dropdown-menu');
    var logoutBtn = document.getElementById('logout-btn');
    var navProfileImg = document.getElementById('nav-profile-img');
    var userData = getCurrentUser();
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
        profileBtn.addEventListener('click', function () {
            if (dropdownMenu)
                dropdownMenu.classList.toggle('hidden');
        });
    }
    // Close dropdown if clicked outside
    window.addEventListener('click', function (e) {
        if (userNav && !userNav.contains(e.target)) {
            if (dropdownMenu)
                dropdownMenu.classList.add('hidden');
        }
    });
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            removeCurrentUser();
            window.location.href = '/index.html';
        });
    }
}
