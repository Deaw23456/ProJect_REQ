// =============================================
// Manage Program Page — Template & Exercise Management
// =============================================

// --- Sidebar Item Active Class (Tailwind) ---
const SIDEBAR_ITEM_BASE = "sidebar-item bg-[#1f1f20] p-4 rounded-xl mb-2.5 flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-[#2a2a2b] scale-106";
const SIDEBAR_ITEM_ACTIVE = "sidebar-item bg-[#2a2a2b] border-l-4 border-[#ff8c00] p-4 rounded-xl mb-2.5 flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-[#2a2a2b] scale-106";

/**
 * Creates a new template via prompt and adds it to the sidebar
 */
function createNewTemplate(): void {
    const name = prompt("Enter Template Name:");

    if (name) {
        const list = document.getElementById("template-list");
        if (!list) return;

        const div = document.createElement("div");
        div.className = SIDEBAR_ITEM_BASE;
        div.onclick = function () {
            switchProgram(div, name);
        };

        div.innerHTML = `
<span>${name}</span>
<button onclick="event.stopPropagation(); this.parentElement.remove();">
    <svg class="w-8 h-8 duration-200 hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
    </svg>
</button>
`;

        list.appendChild(div);
        switchProgram(div, name);
    }
}

/**
 * Switches active program in sidebar and updates title
 */
function switchProgram(element: HTMLElement, title: string): void {
    document.querySelectorAll(".sidebar-item")
        .forEach(item => {
            (item as HTMLElement).className = SIDEBAR_ITEM_BASE;
        });

    element.className = SIDEBAR_ITEM_ACTIVE;

    const displayTitle = document.getElementById("display-title");
    if (displayTitle) {
        displayTitle.innerText = title;
    }
}

/**
 * Adds a new exercise card to the container
 */
function addExercise(): void {
    const container = document.getElementById("exercise-container");
    if (!container) return;

    const div = document.createElement("div");
    div.className = "bg-[#1f1f20] border border-[#2a2a2a] p-5 md:p-[30px] rounded-[30px] mb-5 flex flex-col gap-5 transition-all duration-200 hover:border-[#ff8c00]";

    div.innerHTML = `
<input type="text" placeholder="Exercise Name" class="bg-transparent border-b border-[#333] text-2xl md:text-[32px] font-black text-white outline-none p-3">
<input type="text" placeholder="Sets / Reps" class="bg-transparent border-none text-xl text-[#ff8c00] font-bold outline-none">
<button onclick="this.parentElement.remove()" class="text-white font-bold py-2 px-4 rounded-md mt-2 self-end hover:text-[#ff8c00]">REMOVE</button>
`;

    container.appendChild(div);
}

// Expose functions globally for onclick handlers in HTML
(window as any).createNewTemplate = createNewTemplate;
(window as any).switchProgram = switchProgram;
(window as any).addExercise = addExercise;

// Initialize navigation
initNav();
