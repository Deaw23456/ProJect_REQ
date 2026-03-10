// =============================================
// Index Page — Trainer Cards Display
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNav();

    // --- Display trainer cards ---
    const trainerCardsContainer = document.getElementById('trainer-cards-container');
    if (!trainerCardsContainer) return;

    const trainers = getRegisteredUsers().filter(user => user.position === 'trainer');

    trainers.forEach(trainer => {
        const card = document.createElement('a');
        card.href = `/page/view_profile.html?username=${trainer.username}`;
        card.className = "relative flex w-full max-w-[20rem] flex-col rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 bg-clip-border text-white shadow-lg mt-10 hover:scale-105 transition-all duration-300 h-80";
        card.innerHTML = `
            <div class="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-black/20 bg-gradient-to-r flex items-center justify-center">
                <img src="${trainer.profileImg || DEFAULT_PROFILE_IMG}" alt="${trainer.fullname || trainer.username}'s profile" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
                <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
                    ${trainer.fullname || trainer.username}
                </h5>
                <p class="block font-sans text-base font-light leading-relaxed text-gray-300 antialiased">
                    Position: ${trainer.position ? capitalize(trainer.position) : 'N/A'}
                    ${trainer.age ? `<br>Age: ${trainer.age}` : ''}
                    ${trainer.gender ? `<br>Gender: ${trainer.gender}` : ''}
                </p>
            </div>
        `;
        trainerCardsContainer.appendChild(card);
    });
});