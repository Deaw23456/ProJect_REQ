"use strict";
// =============================================
// View Profile Page — View Other User's Profile
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNav();
    // Load profile data from URL parameter
    loadProfileFromUrl();
    // Initialize review system
    initReviewSystem();
    // Render mini profiles sidebar
    renderMiniProfiles();
});
// --- Profile Loading ---
function loadProfileFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetUsername = urlParams.get('username');
    if (!targetUsername) {
        console.log("No username parameter found in URL.");
        return;
    }
    const registeredUsers = getRegisteredUsers();
    const userProfile = registeredUsers.find(user => user.username === targetUsername);
    if (!userProfile) {
        console.warn(`User with username '${targetUsername}' not found.`);
        return;
    }
    // Set profile images
    const profileImg = document.getElementById('profileImg');
    const profileBackgroundImg = document.querySelector('.relative.w-full.h-64.bg-gray-700.rounded-lg img');
    if (profileImg)
        profileImg.src = userProfile.profileImg || DEFAULT_PROFILE_IMG;
    if (profileBackgroundImg)
        profileBackgroundImg.src = userProfile.profileBackgroundImg || DEFAULT_BG_IMG;
    // Populate profile fields ด้วย shared helper
    populateProfileFields(userProfile, {
        profileUsername: 'Profile_Username',
        profilePosition: 'Profile_Position',
        username: 'Show_Username',
        email: 'Show_Email',
        fullname: 'Show_Fullname',
        age: 'Show_Age',
        gender: 'Show_Gender',
        position: 'Show_Position',
        phone: 'Show_Phone',
        weight: 'Show_Weight',
        height: 'Show_Height',
        posiUpdate: 'Posi_update'
    });
    const noProfileMessage = document.getElementById('noProfileMessage');
    if (noProfileMessage)
        noProfileMessage.classList.add('hidden');
}
// --- Review System ---
function initReviewSystem() {
    let currentRating = 0;
    const reviews = [];
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-value');
    const submitBtn = document.getElementById('submit-review');
    const reviewInput = document.getElementById('review-text');
    const reviewListArea = document.getElementById('review-list');
    if (!ratingText || !submitBtn || !reviewInput || !reviewListArea)
        return;
    const updateStars = (rating) => {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.replace('text-gray-400', 'text-yellow-400');
            }
            else {
                star.classList.replace('text-yellow-400', 'text-gray-400');
            }
        });
    };
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStars(currentRating);
            ratingText.innerText = `${currentRating}/5`;
        });
    });
    const renderReviews = () => {
        reviewListArea.innerHTML = '';
        reviews.forEach(rev => {
            const div = document.createElement('div');
            div.className = "bg-[#1e1e1e] p-3 rounded-md border-l-4 border-[#ff8c00]";
            div.innerHTML = `
                <div class="flex text-yellow-400 text-xs mb-1">
                    ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
                </div>
                <p class="text-sm text-gray-200">${rev.text}</p>
                <span class="text-[10px] text-gray-500">${rev.date}</span>
            `;
            reviewListArea.prepend(div);
        });
    };
    submitBtn.addEventListener('click', () => {
        const text = reviewInput.value.trim();
        if (currentRating === 0)
            return alert("กรุณาให้ดาวก่อนนะเพื่อน!");
        if (!text)
            return alert("เขียนอะไรสักหน่อยก่อนส่งครับ!");
        reviews.push({
            rating: currentRating,
            text: text,
            date: new Date().toLocaleString()
        });
        // Reset form
        reviewInput.value = '';
        currentRating = 0;
        updateStars(0);
        ratingText.innerText = '0/5';
        renderReviews();
    });
}
// --- Mini Profiles Sidebar ---
function renderMiniProfiles() {
    const members = [
        { name: "John Doe", role: "Trainer", img: "../img/Image-11.jpg", online: true },
        { name: "Somsak Gym", role: "Member", img: "../img/Image-11.jpg", online: false },
        { name: "Iron Man", role: "Bodybuilder", img: "../img/Image-11.jpg", online: true },
    ];
    const listArea = document.getElementById('mini-profile-list');
    if (!listArea)
        return;
    listArea.innerHTML = members.map(member => `
        <div class="flex items-center p-2 hover:bg-[#3a3a3c] rounded-md transition cursor-pointer group">
            <div class="relative">
                <img src="${member.img}" class="w-10 h-10 rounded-full border border-[#ff8c00] object-cover">
                ${member.online ? '<div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2d2d2f] rounded-full"></div>' : ''}
            </div>
            <div class="ml-3">
                <p class="text-sm font-bold text-white group-hover:text-[#ff8c00]">${member.name}</p>
                <p class="text-[10px] text-gray-400">${member.role}</p>
            </div>
            <button class="ml-auto text-[#ff8c00] opacity-0 group-hover:opacity-100 transition text-xs">
                ทักทาย
            </button>
        </div>
    `).join('');
}
//# sourceMappingURL=../../data/view_profile.js.map