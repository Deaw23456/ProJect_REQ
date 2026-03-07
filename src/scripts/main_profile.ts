// =============================================
// Main Profile Page — Current User's Profile
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNav();

    const profileImg = document.getElementById('profileImg') as HTMLImageElement | null;
    const profileBackgroundImg = document.querySelector('.relative.w-full.h-64.bg-gray-700.rounded-lg img') as HTMLImageElement | null;
    const profileContent = document.getElementById('profileContent');
    const noProfileMessage = document.getElementById('noProfileMessage');

    if (!profileContent || !noProfileMessage) {
        console.error("Required profile elements (profileContent, noProfileMessage) not found.");
        if (noProfileMessage) noProfileMessage.classList.remove('hidden');
        if (profileContent) profileContent.classList.add('hidden');
        return;
    }

    try {
        const userData = getCurrentUser();
        if (!userData) {
            profileContent.classList.add('hidden');
            noProfileMessage.classList.remove('hidden');
            return;
        }

        // Set profile images (with defaults)
        if (profileImg) profileImg.src = userData.profileImg || DEFAULT_PROFILE_IMG;
        if (profileBackgroundImg) profileBackgroundImg.src = userData.profileBackgroundImg || DEFAULT_BG_IMG;

        // Populate all profile fields ด้วย shared helper
        populateProfileFields(userData, {
            profileUsername: 'profileUsername',
            profilePosition: 'profilePosition',
            username: 'show_username',
            email: 'show_email',
            fullname: 'show_fullname',
            age: 'show_age',
            gender: 'show_gender',
            position: 'show_position',
            phone: 'show_phone',
            weight: 'show_weight',
            height: 'show_height',
            posiUpdate: 'posiupdate'
        });

        profileContent.classList.remove('hidden');
        noProfileMessage.classList.add('hidden');
    } catch (e) {
        console.error("Error parsing user data from localStorage", e);
        profileContent.classList.add('hidden');
        noProfileMessage.classList.remove('hidden');
    }
});