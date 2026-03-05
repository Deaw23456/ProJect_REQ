document.addEventListener('DOMContentLoaded', function () {
    var guestNav = document.getElementById('guest-nav');
    var userNav = document.getElementById('user-nav');
    var usernameDisplay = document.getElementById('username-display');
    var profileBtn = document.getElementById('profile-btn');
    var dropdownMenu = document.getElementById('dropdown-menu');
    var logoutBtn = document.getElementById('logout-btn');
    var navProfileImg = document.getElementById('nav-profile-img');
    var userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
        // User is logged in
        var userData = JSON.parse(userDataStr);
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
            navProfileImg.src = '/img/Image-11 สำเนา.jpg'; // Set to default image
        if (usernameDisplay)
            usernameDisplay.textContent = ''; // Clear username
    }
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
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('userData');
            window.location.href = 'index.html';
        });
    }
    // --- New logic for displaying trainer cards ---
    var trainerCardsContainer = document.getElementById('trainer-cards-container');
    if (trainerCardsContainer) {
        var registeredUsersString = localStorage.getItem('registeredUsers');
        var registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];
        var trainers = registeredUsers.filter(function (user) { return user.position === 'trainer'; });
        trainers.forEach(function (trainer) {
            var card = document.createElement('a');
            card.href = "/page/view_profile.html?username=".concat(trainer.username); // Link to view profile page
            card.className = "relative flex w-full max-w-[20rem] flex-col rounded-xl bg-[#2d2d2f] bg-clip-border text-white shadow-md mt-10 hover:scale-105 transition-all duration-300 h-80";
            card.innerHTML = "\n                <div class=\"relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-[#7e7e7e] bg-gradient-to-r flex items-center justify-center\">\n                    <img src=\"".concat(trainer.profileImg || '/img/Image-11 สำเนา.jpg', "\" alt=\"").concat(trainer.fullname || trainer.username, "'s profile\" class=\"w-full h-full object-cover\">\n                </div>\n                <div class=\"p-6\">\n                    <h5 class=\"mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased\">\n                        ").concat(trainer.fullname || trainer.username, "\n                    </h5>\n                    <p class=\"block font-sans text-base font-light leading-relaxed text-inherit antialiased\">\n                        Position: ").concat(trainer.position ? trainer.position.charAt(0).toUpperCase() + trainer.position.slice(1) : 'N/A', "\n                        ").concat(trainer.age ? "<br>Age: ".concat(trainer.age) : '', "\n                        ").concat(trainer.gender ? "<br>Gender: ".concat(trainer.gender) : '', "\n                    </p>\n                </div>\n            ");
            trainerCardsContainer.appendChild(card);
        });
    }
});
