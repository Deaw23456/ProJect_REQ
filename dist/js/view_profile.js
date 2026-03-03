var currentRating = 0;
var reviews = [];
// 1. จัดการเรื่องการคลิกดาว
var stars = document.querySelectorAll('.star');
var ratingText = document.getElementById('rating-value');
stars.forEach(function (star, index) {
    star.addEventListener('click', function () {
        currentRating = index + 1;
        updateStars(currentRating);
        ratingText.innerText = "".concat(currentRating, "/5");
    });
});
var updateStars = function (rating) {
    stars.forEach(function (star, index) {
        if (index < rating) {
            star.classList.replace('text-gray-400', 'text-yellow-400');
        }
        else {
            star.classList.replace('text-yellow-400', 'text-gray-400');
        }
    });
};
// 2. จัดการเรื่องการส่งรีวิวและแสดงผล
var submitBtn = document.getElementById('submit-review');
var reviewInput = document.getElementById('review-text');
var reviewListArea = document.getElementById('review-list');
var renderReviews = function () {
    reviewListArea.innerHTML = ''; // ล้างค่าเก่า
    reviews.forEach(function (rev) {
        var div = document.createElement('div');
        div.className = "bg-[#1e1e1e] p-3 rounded-md border-l-4 border-[#ff8c00]";
        div.innerHTML = "\n            <div class=\"flex text-yellow-400 text-xs mb-1\">\n                ".concat('★'.repeat(rev.rating)).concat('☆'.repeat(5 - rev.rating), "\n            </div>\n            <p class=\"text-sm text-gray-200\">").concat(rev.text, "</p>\n            <span class=\"text-[10px] text-gray-500\">").concat(rev.date, "</span>\n        ");
        reviewListArea.prepend(div); // เอาอันใหม่ไว้บนสุด
    });
};
submitBtn.addEventListener('click', function () {
    var text = reviewInput.value.trim();
    if (currentRating === 0)
        return alert("กรุณาให้ดาวก่อนนะเพื่อน!");
    if (!text)
        return alert("เขียนอะไรสักหน่อยก่อนส่งครับ!");
    var newReview = {
        rating: currentRating,
        text: text,
        date: new Date().toLocaleString()
    };
    reviews.push(newReview);
    // ล้างค่าหลังส่งเสร็จ
    reviewInput.value = '';
    currentRating = 0;
    updateStars(0);
    ratingText.innerText = "0/5";
    renderReviews();
});
var members = [
    { name: "John Doe", role: "Trainer", img: "../img/Image-11.jpg", online: true },
    { name: "Somsak Gym", role: "Member", img: "../img/Image-11.jpg", online: false },
    { name: "Iron Man", role: "Bodybuilder", img: "../img/Image-11.jpg", online: true },
];
var listArea = document.getElementById('mini-profile-list');
var renderMiniProfiles = function () {
    listArea.innerHTML = members.map(function (member) { return "\n        <div class=\"flex items-center p-2 hover:bg-[#3a3a3c] rounded-md transition cursor-pointer group\">\n            <div class=\"relative\">\n                <img src=\"".concat(member.img, "\" class=\"w-10 h-10 rounded-full border border-[#ff8c00] object-cover\">\n                ").concat(member.online ? '<div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2d2d2f] rounded-full"></div>' : '', "\n            </div>\n            <div class=\"ml-3\">\n                <p class=\"text-sm font-bold text-white group-hover:text-[#ff8c00]\">").concat(member.name, "</p>\n                <p class=\"text-[10px] text-gray-400\">").concat(member.role, "</p>\n            </div>\n            <button class=\"ml-auto text-[#ff8c00] opacity-0 group-hover:opacity-100 transition text-xs\">\n                \u0E17\u0E31\u0E01\u0E17\u0E32\u0E22\n            </button>\n        </div>\n    "); }).join('');
};
renderMiniProfiles();
