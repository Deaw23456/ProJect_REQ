// src/scripts/main_profile.ts

document.addEventListener('DOMContentLoaded', () => {
    // Display elements
    const profileUsernameDisplay = document.getElementById('profileUsername');
    const profilePositionDisplay = document.getElementById('profilePosition');
    const profileBackgroundImg = document.getElementById('profileBackgroundImg') as HTMLImageElement;
    const profileImg = document.getElementById('profileImg') as HTMLImageElement;

    // Display-only fields for the "About Me" section
    const showUsername = document.getElementById('show_username'); // Changed from edit_username to show_username
    const showEmail = document.getElementById('show_email');     // Changed from edit_email to show_email
    const showFullname = document.getElementById('show_fullname'); // Changed from edit_fullname to show_fullname
    const showAge = document.getElementById('show_age');         // Changed from edit_age to show_age
    const showGender = document.getElementById('show_gender');   // Changed from edit_gender to show_gender
    const showPosition = document.getElementById('show_position'); // Changed from edit_position to show_position
    const showPhone = document.getElementById('show_phone');     // Changed from edit_phone to show_phone
    const showWeight = document.getElementById('show_weight');   // Changed from edit_weight to show_weight
    const showHeight = document.getElementById('show_height');   // Changed from edit_height to show_height

    const profileContent = document.getElementById('profileContent');
    const noProfileMessage = document.getElementById('noProfileMessage');
    const saveProfileButton = document.getElementById('saveProfileButton');

    const userDataString = localStorage.getItem('userData');

    if (profileContent && noProfileMessage) {
        try {
            let userData = userDataString ? JSON.parse(userDataString) : {};

            // Set default profile images if not present
            if (!userData.profileBackgroundImg) {
                userData.profileBackgroundImg = 'https://via.placeholder.com/1500x400?text=Profile+Background';
            }
            if (!userData.profileImg) {
                userData.profileImg = 'https://via.placeholder.com/150x150?text=Profile';
            }

            // Display profile data
            if (profileUsernameDisplay) profileUsernameDisplay.textContent = userData.username || 'Guest';
            if (profilePositionDisplay) profilePositionDisplay.textContent = userData.position || 'N/A';
            if (profileBackgroundImg) profileBackgroundImg.src = userData.profileBackgroundImg;
            if (profileImg) profileImg.src = userData.profileImg;

            // Populate display fields
            if (showUsername) showUsername.textContent = userData.username || '-';
            if (showEmail) showEmail.textContent = userData.email || '-';
            if (showFullname) showFullname.textContent = userData.fullname || '-';
            if (showAge) showAge.textContent = userData.age ? userData.age.toString() : '-';
            if (showGender) showGender.textContent = userData.gender || '-';
            if (showPosition) showPosition.textContent = userData.position || '-';
            if (showPhone) showPhone.textContent = userData.phone || '-';
            if (showWeight) showWeight.textContent = userData.weight ? `${userData.weight} kg` : '-';
            if (showHeight) showHeight.textContent = userData.height ? `${userData.height} cm` : '-';
            // The posiupdate element is likely for the header, which is handled by display_username.ts
            // If it's meant for the profile summary, it should be updated here.
            // Assuming it's for the profile summary in main_profile.html
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
        // If profileContent or noProfileMessage elements are not found, log an error
        console.error("Required profile elements not found.");
    }
});