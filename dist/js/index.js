// =============================================
// Index Page — Trainer Cards Display
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navigation
    initNav();
    // Get all trainers initially
    var allTrainers = getRegisteredUsers().filter(function (user) { return user.position === 'trainer'; });
    // Initial Render
    renderTrainers(allTrainers);
    // --- Search Functionality ---
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            var searchTerm = e.target.value.trim().toLowerCase();
            var filteredTrainers = allTrainers.filter(function (t) {
                return (t.fullname || "").toLowerCase().includes(searchTerm) ||
                    (t.username || "").toLowerCase().includes(searchTerm);
            });
            renderTrainers(filteredTrainers);
        });
    }
});
function renderTrainers(trainers) {
    var trainerCardsContainer = document.getElementById('trainer-cards-container');
    if (!trainerCardsContainer)
        return;
    trainerCardsContainer.innerHTML = '';
    if (trainers.length === 0) {
        trainerCardsContainer.innerHTML = '<p class="text-gray-400 text-center w-full col-span-full py-10">ไม่พบรายชื่อเทรนเนอร์ที่ค้นหา</p>';
        return;
    }
    trainers.forEach(function (trainer) {
        var card = document.createElement('a');
        card.href = "/page/view_profile.html?username=".concat(trainer.username);
        card.className = "relative flex w-full max-w-[20rem] flex-col rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 bg-clip-border text-white shadow-lg mt-10 hover:scale-105 transition-all duration-300 h-80";
        card.innerHTML = "\n            <div class=\"relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-black/20 bg-gradient-to-r flex items-center justify-center\">\n                <img src=\"".concat(trainer.profileImg || DEFAULT_PROFILE_IMG, "\" alt=\"").concat(trainer.fullname || trainer.username, "'s profile\" class=\"w-full h-full object-cover\">\n            </div>\n            <div class=\"p-6\">\n                <h5 class=\"mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased\">\n                    ").concat(trainer.fullname || trainer.username, "\n                </h5>\n                <p class=\"block font-sans text-base font-light leading-relaxed text-gray-300 antialiased\">\n                    Position: ").concat(trainer.position ? capitalize(trainer.position) : 'N/A', "\n                    ").concat(trainer.age ? "<br>Age: ".concat(trainer.age) : '', "\n                    ").concat(trainer.gender ? "<br>Gender: ".concat(trainer.gender) : '', "\n                </p>\n            </div>\n        ");
        trainerCardsContainer.appendChild(card);
    });
}
