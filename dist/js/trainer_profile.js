// =============================================
// Trainer Profile Page — GymHub
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navigation bar
    initNav();
    var trainerData = getCurrentUser();
    if (!trainerData || trainerData.position !== 'trainer') {
        return;
    }
    // --- Profile Images ---
    var profileImg = document.getElementById('trainer-main-profile-img');
    var backgroundImg = document.getElementById('trainer-bg-img');
    if (profileImg) {
        profileImg.src = trainerData.profileImg || DEFAULT_PROFILE_IMG;
    }
    if (backgroundImg) {
        backgroundImg.src = trainerData.profileBackgroundImg || DEFAULT_BG_IMG;
    }
    // --- Profile Header (name + position under cover) ---
    setTextContent('trainer-display-name', trainerData.fullname || trainerData.username || 'Trainer');
    setTextContent('trainer-display-position', trainerData.position ? capitalize(trainerData.position) : 'Trainer');
    // --- About Me Section: ใช้ populateProfileFields ---
    populateProfileFields(trainerData, {
        username: 'trainer-show-username',
        email: 'trainer-show-email',
        fullname: 'trainer-show-fullname',
        age: 'trainer-show-age',
        gender: 'trainer-show-gender',
        position: 'trainer-show-position',
        phone: 'trainer-show-phone',
        weight: 'trainer-show-weight',
        height: 'trainer-show-height',
        posiUpdate: 'trainer-posi-update',
    });
    // --- Sidebar Profile (bottom of sidebar) ---
    var sidebarImg = document.getElementById('trainer-profile-img');
    var sidebarName = document.getElementById('trainer-profile-name');
    var sidebarPosition = document.getElementById('trainer-profile-position');
    if (sidebarImg) {
        sidebarImg.src = trainerData.profileImg || DEFAULT_PROFILE_IMG;
    }
    if (sidebarName) {
        sidebarName.textContent = trainerData.fullname || trainerData.username || 'Trainer';
    }
    if (sidebarPosition) {
        sidebarPosition.textContent = capitalize(trainerData.position);
    }
    // --- Sidebar Logout ---
    var logoutSidebar = document.getElementById('sidebar-logout-btn');
    if (logoutSidebar) {
        logoutSidebar.addEventListener('click', function () {
            removeCurrentUser();
            window.location.href = '/index.html';
        });
    }
});
