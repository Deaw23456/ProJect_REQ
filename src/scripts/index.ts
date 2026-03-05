interface UserData {
    username: string;
    email: string;
    password?: string; // Password might not be stored in all contexts or might be hashed
    fullname?: string;
    age?: number;
    gender?: string;
    position?: 'member' | 'trainer';
    phone?: string;
    weight?: number;
    height?: number;
    profileImg?: string;
    profileBackgroundImg?: string;
    // Add any other fields that might be stored for a user
}

interface UserData {
    username: string;
    email: string;
    password?: string; // Password might not be stored in all contexts or might be hashed
    fullname?: string;
    age?: number;
    gender?: string;
    position?: 'member' | 'trainer';
    phone?: string;
    weight?: number;
    height?: number;
    profileImg?: string;
    profileBackgroundImg?: string;
    // Add any other fields that might be stored for a user
}

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
        if (navProfileImg) navProfileImg.src = '/img/Image-11 สำเนา.jpg'; // Set to default image
        if (usernameDisplay) usernameDisplay.textContent = ''; // Clear username
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

    // --- New logic for displaying trainer cards ---
    const trainerCardsContainer = document.getElementById('trainer-cards-container');
    if (trainerCardsContainer) {
        const registeredUsersString = localStorage.getItem('registeredUsers');
        const registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];

        const trainers = registeredUsers.filter(user => user.position === 'trainer');

        trainers.forEach(trainer => {
            const card = document.createElement('a');
            card.href = `/page/view_profile.html?username=${trainer.username}`; // Link to view profile page
            card.className = "relative flex w-full max-w-[20rem] flex-col rounded-xl bg-[#2d2d2f] bg-clip-border text-white shadow-md mt-10 hover:scale-105 transition-all duration-300 h-80";
            card.innerHTML = `
                <div class="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-[#7e7e7e] bg-gradient-to-r flex items-center justify-center">
                    <img src="${trainer.profileImg || '/img/Image-11 สำเนา.jpg'}" alt="${trainer.fullname || trainer.username}'s profile" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        ${trainer.fullname || trainer.username}
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        Position: ${trainer.position ? trainer.position.charAt(0).toUpperCase() + trainer.position.slice(1) : 'N/A'}
                        ${trainer.age ? `<br>Age: ${trainer.age}` : ''}
                        ${trainer.gender ? `<br>Gender: ${trainer.gender}` : ''}
                    </p>
                </div>
            `;
            trainerCardsContainer.appendChild(card);
        });
    }
});