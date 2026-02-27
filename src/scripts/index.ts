document.addEventListener('DOMContentLoaded', () => {
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    const usernameDisplay = document.getElementById('username-display');
    const profileBtn = document.getElementById('profile-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const logoutBtn = document.getElementById('logout-btn');
    const navProfileImg = document.getElementById('nav-profile-img') as HTMLImageElement;

    const userDataStr = localStorage.getItem('userData');

    if (userDataStr) {
        // User is logged in
        const userData = JSON.parse(userDataStr);
        
        if (guestNav) guestNav.classList.add('hidden');
        if (userNav) userNav.classList.remove('hidden');
        if (usernameDisplay) usernameDisplay.textContent = userData.username;
        if (navProfileImg && userData.profileImg) {
            navProfileImg.src = userData.profileImg;
        }

    } else {
        // User is not logged in
        if (guestNav) guestNav.classList.remove('hidden');
        if (userNav) userNav.classList.add('hidden');
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            if (dropdownMenu) dropdownMenu.classList.toggle('hidden');
        });
    }

    // Close dropdown if clicked outside
    window.addEventListener('click', function(e: MouseEvent) {
        if (userNav && !userNav.contains(e.target as Node)) {
            if (dropdownMenu) dropdownMenu.classList.add('hidden');
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            localStorage.removeItem('userData');
            window.location.href = 'index.html';
        });
    }
});