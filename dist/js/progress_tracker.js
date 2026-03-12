var activeWorkout = JSON.parse(localStorage.getItem('clientWorkoutSession') || '[]');
function renderTracker() {
    var listContainer = document.getElementById('exercise-list');
    if (!listContainer)
        return;
    listContainer.innerHTML = '';
    if (activeWorkout.length === 0) {
        listContainer.innerHTML = "<p class=\"text-center text-gray-500 italic py-10\">\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E17\u0E48\u0E32\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E01\u0E32\u0E22<br>\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E2B\u0E19\u0E49\u0E32 Assign Program</p>";
        return;
    }
    activeWorkout.forEach(function (ex) {
        var item = document.createElement('div');
        item.className = "exercise-item bg-[#1e1e20] p-4 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-[#252528] border border-transparent hover:border-gray-700 transition-all duration-200";
        item.onclick = function () { toggleTask(item); };
        item.innerHTML = "\n            <div class=\"flex-1 pr-4\">\n                <h4 class=\"font-bold text-md text-white\">".concat(ex.name, "</h4>\n                <p class=\"text-xs text-gray-500 mt-1\">").concat(ex.detail, "</p>\n            </div>\n            \n            <div class=\"flex items-center\">\n                <div class=\"checkbox-circle w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center transition-all duration-300\">\n                    <svg class=\"check-icon w-3.5 h-3.5 text-black hidden check-pop\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"4\" d=\"M5 13l4 4L19 7\"></path></svg>\n                </div>\n            </div>\n        ");
        listContainer.appendChild(item);
    });
}
function toggleTask(element) {
    var circle = element.querySelector('.checkbox-circle');
    var icon = element.querySelector('.check-icon');
    if (!circle || !icon)
        return;
    if (circle.classList.contains('bg-[#ff8c00]')) {
        circle.classList.remove('bg-[#ff8c00]', 'border-[#ff8c00]');
        circle.classList.add('border-gray-600');
        icon.classList.add('hidden');
        element.classList.remove('border-[#ff8c00]/30', 'bg-[#ff8c00]/5');
    }
    else {
        circle.classList.remove('border-gray-600');
        circle.classList.add('bg-[#ff8c00]', 'border-[#ff8c00]');
        icon.classList.remove('hidden');
        element.classList.add('border-[#ff8c00]/30', 'bg-[#ff8c00]/5');
    }
}
function finishSession() {
    var modal = document.getElementById('success-modal');
    var modalContent = document.getElementById('modal-content');
    if (!modal || !modalContent)
        return;
    modal.classList.remove('hidden');
    setTimeout(function () {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-90');
        modalContent.classList.add('scale-100');
    }, 10);
    localStorage.removeItem('clientWorkoutSession');
}
// ทำให้ฟังก์ชัน `finishSession` สามารถเรียกใช้จาก HTML inline `onclick` ได้
window.finishSession = finishSession;
window.onload = renderTracker;
