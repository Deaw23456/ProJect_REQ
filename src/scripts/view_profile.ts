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