// =============================================
// Manage Program Page — Template & Exercise Management
// =============================================
// --- Sidebar Item Active Class (Tailwind) ---
var SIDEBAR_ITEM_BASE = "sidebar-item bg-[#1f1f20] p-4 rounded-xl mb-2.5 flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-[#2a2a2b] scale-106";
var SIDEBAR_ITEM_ACTIVE = "sidebar-item bg-[#2a2a2b] border-l-4 border-[#ff8c00] p-4 rounded-xl mb-2.5 flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-[#2a2a2b] scale-106";
/**
 * Creates a new template via prompt and adds it to the sidebar
 */
function createNewTemplate() {
    var name = prompt("Enter Template Name:");
    if (name) {
        var list = document.getElementById("template-list");
        if (!list)
            return;
        var div_1 = document.createElement("div");
        div_1.className = SIDEBAR_ITEM_BASE;
        div_1.onclick = function () {
            switchProgram(div_1, name);
        };
        div_1.innerHTML = "\n<span>".concat(name, "</span>\n<button onclick=\"event.stopPropagation(); this.parentElement.remove();\">\n    <svg class=\"w-8 h-8 duration-200 hover:scale-110\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"/>\n        <g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        <g id=\"SVGRepo_iconCarrier\"> <path d=\"M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </g>\n    </svg>\n</button>\n");
        list.appendChild(div_1);
        switchProgram(div_1, name);
    }
}
/**
 * Switches active program in sidebar and updates title
 */
function switchProgram(element, title) {
    document.querySelectorAll(".sidebar-item")
        .forEach(function (item) {
        item.className = SIDEBAR_ITEM_BASE;
    });
    element.className = SIDEBAR_ITEM_ACTIVE;
    var displayTitle = document.getElementById("display-title");
    if (displayTitle) {
        displayTitle.innerText = title;
    }
}
/**
 * Adds a new exercise card to the container
 */
function addExercise() {
    var container = document.getElementById("exercise-container");
    if (!container)
        return;
    var div = document.createElement("div");
    div.className = "bg-[#1f1f20] border border-[#2a2a2a] p-[30px] rounded-[30px] mb-5 flex flex-col gap-5 transition-all duration-200 hover:border-[#ff8c00]";
    div.innerHTML = "\n<input type=\"text\" placeholder=\"Exercise Name\" class=\"bg-transparent border-b border-[#333] text-[32px] font-black text-white outline-none p-3\">\n<input type=\"text\" placeholder=\"Sets / Reps\" class=\"bg-transparent border-none text-xl text-[#ff8c00] font-bold outline-none\">\n<button onclick=\"this.parentElement.remove()\" class=\"text-white font-bold py-2 px-4 rounded-md mt-2 self-end hover:text-[#ff8c00]\">REMOVE</button>\n";
    container.appendChild(div);
}
// Expose functions globally for onclick handlers in HTML
window.createNewTemplate = createNewTemplate;
window.switchProgram = switchProgram;
window.addExercise = addExercise;
// Initialize navigation
initNav();
