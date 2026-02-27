// src/scripts/main_profile.ts

document.addEventListener('DOMContentLoaded', () => {
    // Display elements
    const profileUsernameDisplay = document.getElementById('profileUsername');
    const profilePositionDisplay = document.getElementById('profilePosition');
    const profileImg = document.getElementById('profileImg') as HTMLImageElement;
    

    // Display-only fields for the "About Me" section
    const showUsername = document.getElementById('show_username');
    const showEmail = document.getElementById('show_email');
    const showFullname = document.getElementById('show_fullname');
    const showAge = document.getElementById('show_age');
    const showGender = document.getElementById('show_gender');
    const showPosition = document.getElementById('show_position');
    const showPhone = document.getElementById('show_phone');
    const showWeight = document.getElementById('show_weight');
    const showHeight = document.getElementById('show_height');

    const profileContent = document.getElementById('profileContent');
    const noProfileMessage = document.getElementById('noProfileMessage');
    const saveProfileButton = document.getElementById('saveProfileButton');

    const userDataString = localStorage.getItem('userData');

    if (profileContent && noProfileMessage) {
        try {
            let userData = userDataString ? JSON.parse(userDataString) : {};

            // Set default profile images if not present
            if (!userData.profileBackgroundImg) {
                userData.profileBackgroundImg = '/img/gym hub-2 สำเนา.png'; // Default background image
            }
            if (!userData.profileImg) {
                userData.profileImg = '/img/Image-11 สำเนา.jpg'; // Default profile image
            }

            // Display profile data
            if (profileUsernameDisplay) profileUsernameDisplay.textContent = userData.username || 'Guest';
            if (profilePositionDisplay) profilePositionDisplay.textContent = userData.position || 'N/A';
            if (profileImg) profileImg.src = userData.profileImg;

            // Populate "About Me" display fields
            if (showUsername) showUsername.textContent = userData.username || '-';
            if (showEmail) showEmail.textContent = userData.email || '-';
            if (showFullname) showFullname.textContent = userData.fullname || '-';
            if (showAge) showAge.textContent = userData.age ? userData.age.toString() : '-';
            if (showGender) showGender.textContent = userData.gender || '-';
            if (showPosition) showPosition.textContent = userData.position || '-';
            if (showPhone) showPhone.textContent = userData.phone || '-';
            if (showWeight) showWeight.textContent = userData.weight ? `${userData.weight} kg` : '-';
            if (showHeight) showHeight.textContent = userData.height ? `${userData.height} cm` : '-';
            
            // Update the position in the small summary header within the About Me section
            const posiUpdate = document.getElementById('posiupdate');
            if (posiUpdate) posiUpdate.textContent = userData.position || '-';

            profileContent.classList.remove('hidden');
            noProfileMessage.classList.add('hidden');

        } catch (e) {
            console.error("Error parsing user data from localStorage", e);
            profileContent.classList.add('hidden');
            noProfileMessage.classList.remove('hidden');
        }
    } else {
        // If critical elements are missing, log an error and ensure noProfileMessage is visible
        console.error("Required profile elements (profileContent, noProfileMessage) not found.");
        if (noProfileMessage) noProfileMessage.classList.remove('hidden');
        if (profileContent) profileContent.classList.add('hidden');
    }
});