// =============================================
// Index Page — Trainer Cards Display
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNav();

    // Get all trainers initially
    const allTrainers = getRegisteredUsers().filter(user => user.position === 'trainer');
    
    // Initial Render
    renderTrainers(allTrainers);

    // --- Search Functionality ---
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = (e.target as HTMLInputElement).value.trim().toLowerCase();
            const filteredTrainers = allTrainers.filter(t => 
                (t.fullname || "").toLowerCase().includes(searchTerm) || 
                (t.username || "").toLowerCase().includes(searchTerm)
            );
            renderTrainers(filteredTrainers);
        });
    }
});

function renderTrainers(trainers: UserData[]): void {
    const trainerCardsContainer = document.getElementById('trainer-cards-container');
    if (!trainerCardsContainer) return;

    trainerCardsContainer.innerHTML = '';

    if (trainers.length === 0) {
        trainerCardsContainer.innerHTML = '<p class="text-gray-400 text-center w-full col-span-full py-10">ไม่พบรายชื่อเทรนเนอร์ที่ค้นหา</p>';
        return;
    }

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
}