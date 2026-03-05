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
document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var targetUsername = urlParams.get('username');
    if (targetUsername) {
        var registeredUsersString = localStorage.getItem('registeredUsers');
        var registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];
        var userProfile = registeredUsers.find(function (user) { return user.username === targetUsername; });
        if (userProfile) {
            // Update main profile header
            var profileUsernameDisplay = document.getElementById('Profile_Username'); // Assuming this ID exists in view_profile.html
            var profilePositionDisplay = document.getElementById('Profile_Position'); // Assuming this ID exists
            var profileImg = document.getElementById('profileImg'); // Assuming this ID exists
            var profileBackgroundImg = document.querySelector('.relative.w-full.h-64.bg-gray-700.rounded-lg img'); // Assuming this selector works
            if (profileUsernameDisplay)
                profileUsernameDisplay.textContent = userProfile.username;
            if (profilePositionDisplay)
                profilePositionDisplay.textContent = userProfile.position ? userProfile.position.charAt(0).toUpperCase() + userProfile.position.slice(1) : 'N/A';
            if (profileImg)
                profileImg.src = userProfile.profileImg || '/img/Image-11 สำเนา.jpg';
            if (profileBackgroundImg)
                profileBackgroundImg.src = userProfile.profileBackgroundImg || '/img/gym hub-2 สำเนา.png';
            // Populate "About Me" display fields (assuming similar IDs to main_profile.html)
            var showUsername = document.getElementById('Show_Username');
            var showEmail = document.getElementById('Show_Email');
            var showFullname = document.getElementById('Show_Fullname');
            var showAge = document.getElementById('Show_Age');
            var showGender = document.getElementById('Show_Gender');
            var showPosition = document.getElementById('Show_Position');
            var showPhone = document.getElementById('Show_Phone');
            var showWeight = document.getElementById('Show_Weight');
            var showHeight = document.getElementById('Show_Height');
            var posiUpdate = document.getElementById('Posi_update');
            if (showUsername)
                showUsername.textContent = userProfile.username || '-';
            if (showEmail)
                showEmail.textContent = userProfile.email || '-';
            if (showFullname)
                showFullname.textContent = userProfile.fullname || '-';
            if (showAge)
                showAge.textContent = userProfile.age ? userProfile.age.toString() : '-';
            if (showGender)
                showGender.textContent = userProfile.gender || '-';
            if (showPosition)
                showPosition.textContent = userProfile.position || '-';
            if (showPhone)
                showPhone.textContent = userProfile.phone || '-';
            if (showWeight)
                showWeight.textContent = userProfile.weight ? "".concat(userProfile.weight, " kg") : '-';
            if (showHeight)
                showHeight.textContent = userProfile.height ? "".concat(userProfile.height, " cm") : '-';
            if (posiUpdate)
                posiUpdate.textContent = userProfile.position || '-';
            var noProfileMessage = document.getElementById('noProfileMessage');
            if (noProfileMessage)
                noProfileMessage.classList.add('hidden');
        }
        else {
            console.warn("User with username '".concat(targetUsername, "' not found."));
        }
    }
    else {
        console.log("No username parameter found in URL. Displaying current user's profile or default.");
    }
});
