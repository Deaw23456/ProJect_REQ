// src/scripts/main_profile.ts
document.addEventListener('DOMContentLoaded', function () {
    // Display elements
    // Display-only fields for the "About Me" section
    var showUsername = document.getElementById('show_username');
    var showEmail = document.getElementById('show_email');
    var showFullname = document.getElementById('show_fullname');
    var showAge = document.getElementById('show_age');
    var showGender = document.getElementById('show_gender');
    var showPosition = document.getElementById('show_position');
    var showPhone = document.getElementById('show_phone');
    var showWeight = document.getElementById('show_weight');
    var showHeight = document.getElementById('show_height');
    var profileUsernameDisplay = document.getElementById('profileUsername');
    var profilePositionDisplay = document.getElementById('profilePosition');
    var profileImg = document.getElementById('profileImg');
    var profileBackgroundImg = document.querySelector('.relative.w-full.h-64.bg-gray-700.rounded-lg img');
    var profileContent = document.getElementById('profileContent');
    var noProfileMessage = document.getElementById('noProfileMessage');
    var userDataString = localStorage.getItem('userData');
    if (profileContent && noProfileMessage) {
        try {
            var userData = userDataString ? JSON.parse(userDataString) : {};
            // Set default profile images if not present
            if (!userData.profileBackgroundImg) {
                userData.profileBackgroundImg = '/img/gym hub-2 สำเนา.png'; // Default background image
            }
            if (!userData.profileImg) {
                userData.profileImg = '/img/Image-11 สำเนา.jpg'; // Default profile image
            }
            // Update main profile header
            if (profileUsernameDisplay)
                profileUsernameDisplay.textContent = userData.username || 'Guest';
            if (profilePositionDisplay)
                profilePositionDisplay.textContent = userData.position ? userData.position.charAt(0).toUpperCase() + userData.position.slice(1) : 'N/A';
            if (profileImg)
                profileImg.src = userData.profileImg;
            if (profileBackgroundImg)
                profileBackgroundImg.src = userData.profileBackgroundImg;
            // Display profile data
            // Populate "About Me" display fields
            if (showUsername)
                showUsername.textContent = userData.username || '-';
            if (showEmail)
                showEmail.textContent = userData.email || '-';
            if (showFullname)
                showFullname.textContent = userData.fullname || '-';
            if (showAge)
                showAge.textContent = userData.age ? userData.age.toString() : '-';
            if (showGender)
                showGender.textContent = userData.gender || '-';
            if (showPosition)
                showPosition.textContent = userData.position || '-';
            if (showPhone)
                showPhone.textContent = userData.phone || '-';
            if (showWeight)
                showWeight.textContent = userData.weight ? "".concat(userData.weight, " kg") : '-';
            if (showHeight)
                showHeight.textContent = userData.height ? "".concat(userData.height, " cm") : '-';
            // Update the position in the small summary header within the About Me section
            var posiUpdate = document.getElementById('posiupdate'); // Corrected ID to match view_profile.ts
            if (posiUpdate)
                posiUpdate.textContent = userData.position || '-';
            profileContent.classList.remove('hidden');
            noProfileMessage.classList.add('hidden');
        }
        catch (e) {
            console.error("Error parsing user data from localStorage", e);
            profileContent.classList.add('hidden');
            noProfileMessage.classList.remove('hidden');
        }
    }
    else {
        // If critical elements are missing, log an error and ensure noProfileMessage is visible
        console.error("Required profile elements (profileContent, noProfileMessage) not found.");
        if (noProfileMessage)
            noProfileMessage.classList.remove('hidden');
        if (profileContent)
            profileContent.classList.add('hidden');
    }
});
