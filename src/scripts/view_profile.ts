interface Review {
    rating: number;
    text: string;
    date: string;
}

let currentRating = 0;
const reviews: Review[] = [];

// 1. จัดการเรื่องการคลิกดาว
const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('rating-value')!;

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        currentRating = index + 1;
        updateStars(currentRating);
        ratingText.innerText = `${currentRating}/5`;
    });
});

const updateStars = (rating: number) => {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.replace('text-gray-400', 'text-yellow-400');
        } else {
            star.classList.replace('text-yellow-400', 'text-gray-400');
        }
    });
};

// 2. จัดการเรื่องการส่งรีวิวและแสดงผล
const submitBtn = document.getElementById('submit-review')!;
const reviewInput = document.getElementById('review-text') as HTMLTextAreaElement;
const reviewListArea = document.getElementById('review-list')!;

const renderReviews = () => {
    reviewListArea.innerHTML = ''; // ล้างค่าเก่า
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
        reviewListArea.prepend(div); // เอาอันใหม่ไว้บนสุด
    });
};

submitBtn.addEventListener('click', () => {
    const text = reviewInput.value.trim();
    
    if (currentRating === 0) return alert("กรุณาให้ดาวก่อนนะเพื่อน!");
    if (!text) return alert("เขียนอะไรสักหน่อยก่อนส่งครับ!");

    const newReview: Review = {
        rating: currentRating,
        text: text,
        date: new Date().toLocaleString()
    };

    reviews.push(newReview);
    
    // ล้างค่าหลังส่งเสร็จ
    reviewInput.value = '';
    currentRating = 0;
    updateStars(0);
    ratingText.innerText = `0/5`;

    renderReviews();
});



interface MiniProfile {
    name: string;
    role: string;
    img: string;
    online: boolean;
}

const members: MiniProfile[] = [
    { name: "John Doe", role: "Trainer", img: "../img/Image-11.jpg", online: true },
    { name: "Somsak Gym", role: "Member", img: "../img/Image-11.jpg", online: false },
    { name: "Iron Man", role: "Bodybuilder", img: "../img/Image-11.jpg", online: true },
];

const listArea = document.getElementById('mini-profile-list')!;

const renderMiniProfiles = () => {
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
};

renderMiniProfiles();

// --- New logic for displaying specific user profile based on URL parameter ---

interface UserData {
    username: string;
    email: string;
    password?: string;
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
    const urlParams = new URLSearchParams(window.location.search);
    const targetUsername = urlParams.get('username');

    if (targetUsername) {
        const registeredUsersString = localStorage.getItem('registeredUsers');
        const registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];

        const userProfile = registeredUsers.find(user => user.username === targetUsername);

        if (userProfile) {
            // Update main profile header
            const profileUsernameDisplay = document.getElementById('Profile_Username'); // Assuming this ID exists in view_profile.html
            const profilePositionDisplay = document.getElementById('Profile_Position'); // Assuming this ID exists
            const profileImg = document.getElementById('profileImg') as HTMLImageElement; // Assuming this ID exists
            const profileBackgroundImg = document.querySelector('.relative.w-full.h-64.bg-gray-700.rounded-lg img') as HTMLImageElement; // Assuming this selector works

            if (profileUsernameDisplay) profileUsernameDisplay.textContent = userProfile.username;
            if (profilePositionDisplay) profilePositionDisplay.textContent = userProfile.position ? userProfile.position.charAt(0).toUpperCase() + userProfile.position.slice(1) : 'N/A';
            if (profileImg) profileImg.src = userProfile.profileImg || '/img/Image-11 สำเนา.jpg';
            if (profileBackgroundImg) profileBackgroundImg.src = userProfile.profileBackgroundImg || '/img/gym hub-2 สำเนา.png';

            // Populate "About Me" display fields (assuming similar IDs to main_profile.html)
            const showUsername = document.getElementById('Show_Username');
            const showEmail = document.getElementById('Show_Email');
            const showFullname = document.getElementById('Show_Fullname');
            const showAge = document.getElementById('Show_Age');
            const showGender = document.getElementById('Show_Gender');
            const showPosition = document.getElementById('Show_Position');
            const showPhone = document.getElementById('Show_Phone');
            const showWeight = document.getElementById('Show_Weight');
            const showHeight = document.getElementById('Show_Height');
            const posiUpdate = document.getElementById('Posi_update');

            if (showUsername) showUsername.textContent = userProfile.username || '-';
            if (showEmail) showEmail.textContent = userProfile.email || '-';
            if (showFullname) showFullname.textContent = userProfile.fullname || '-';
            if (showAge) showAge.textContent = userProfile.age ? userProfile.age.toString() : '-';
            if (showGender) showGender.textContent = userProfile.gender || '-';
            if (showPosition) showPosition.textContent = userProfile.position || '-';
            if (showPhone) showPhone.textContent = userProfile.phone || '-';
            if (showWeight) showWeight.textContent = userProfile.weight ? `${userProfile.weight} kg` : '-';
            if (showHeight) showHeight.textContent = userProfile.height ? `${userProfile.height} cm` : '-';
            if (posiUpdate) posiUpdate.textContent = userProfile.position || '-';

            const noProfileMessage = document.getElementById('noProfileMessage');
            if (noProfileMessage) noProfileMessage.classList.add('hidden');

        } else {
            console.warn(`User with username '${targetUsername}' not found.`);
        }
    } else {
        console.log("No username parameter found in URL. Displaying current user's profile or default.");
    }
});