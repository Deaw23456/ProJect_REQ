// =============================================
// Index Page — Trainer Cards Display
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navigation
    initNav();
    // --- Display trainer cards ---
    var trainerCardsContainer = document.getElementById('trainer-cards-container');
    if (!trainerCardsContainer)
        return;
    var trainers = getRegisteredUsers().filter(function (user) { return user.position === 'trainer'; });
    trainers.forEach(function (trainer) {
        var card = document.createElement('a');
        card.href = "/page/view_profile.html?username=".concat(trainer.username);
        card.className = "relative flex w-full max-w-[20rem] flex-col rounded-xl bg-[#2d2d2f] bg-clip-border text-white shadow-md mt-10 hover:scale-105 transition-all duration-300 h-80";
        card.innerHTML = "\n            <div class=\"relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-[#7e7e7e] bg-gradient-to-r flex items-center justify-center\">\n                <img src=\"".concat(trainer.profileImg || DEFAULT_PROFILE_IMG, "\" alt=\"").concat(trainer.fullname || trainer.username, "'s profile\" class=\"w-full h-full object-cover\">\n            </div>\n            <div class=\"p-6\">\n                <h5 class=\"mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased\">\n                    ").concat(trainer.fullname || trainer.username, "\n                </h5>\n                <p class=\"block font-sans text-base font-light leading-relaxed text-inherit antialiased\">\n                    Position: ").concat(trainer.position ? capitalize(trainer.position) : 'N/A', "\n                    ").concat(trainer.age ? "<br>Age: ".concat(trainer.age) : '', "\n                    ").concat(trainer.gender ? "<br>Gender: ".concat(trainer.gender) : '', "\n                </p>\n            </div>\n        ");
        trainerCardsContainer.appendChild(card);
    });
});
