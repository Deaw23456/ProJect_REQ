"use strict";
// =============================================
// Assign Program Page — GymHub
// =============================================
const mockDatabase = {
    "Full Body Blast": [
        { name: "กระโดดตบ (Jumping Jacks)", detail: "20 ครั้ง / 3 เซ็ต" },
        { name: "วิดพื้น (Push-ups)", detail: "15 ครั้ง / 3 เซ็ต" },
        { name: "สควอท (Squats)", detail: "20 ครั้ง / 4 เซ็ต" },
        { name: "แพลงก์ (Plank)", detail: "60 วินาที / 3 เซ็ต" }
    ],
    "Leg Day": [
        { name: "สควอท (Squats)", detail: "20 ครั้ง / 4 เซ็ต" },
        { name: "ลันจ์ (Lunges)", detail: "15 ครั้ง / 3 เซ็ต (ต่อข้าง)" },
        { name: "กระโดดเชือก", detail: "3 นาที / อุปกรณ์: เชือก" }
    ],
    "Cardio Burn": [
        { name: "วิ่งบนลู่ (Treadmill)", detail: "20 นาที / ความเร็วปานกลาง" },
        { name: "ปั่นจักรยาน (Cycling)", detail: "10 นาที / ความหนืดระดับ 3" }
    ]
};
let currentSelectedTemplate = null;
function loadTemplate(btnElement, templateName) {
    // 1. ไฮไลท์ปุ่มที่ถูกเลือก
    document.querySelectorAll('#template-options button').forEach(btn => {
        btn.classList.remove('template-active');
    });
    btnElement.classList.add('template-active');
    currentSelectedTemplate = templateName;
    // 2. อัปเดตป้าย Badge ด้านบนขวา
    const badge = document.getElementById('preview-badge');
    if (badge) {
        badge.innerText = `Previewing: ${templateName}`;
        badge.className = "bg-[#ff8c00]/20 text-[#ff8c00] border border-[#ff8c00]/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider";
    }
    // 3. วาดรายการท่าออกกำลังกายใหม่
    const exercises = mockDatabase[templateName];
    const previewContainer = document.getElementById('exercise-preview');
    if (!previewContainer || !exercises)
        return;
    previewContainer.innerHTML = '';
    exercises.forEach((ex, index) => {
        const item = document.createElement('div');
        item.className = "bg-[#1f1f20] p-5 rounded-2xl border border-gray-800 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 hover:border-gray-600 transition-colors";
        item.style.animationDelay = `${index * 50}ms`;
        item.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="font-black text-white text-lg tracking-wide">${index + 1}. ${ex.name}</span>
                <button class="text-gray-600 hover:text-red-500 transition text-[10px] uppercase font-bold mt-1">Remove</button>
            </div>
            <span class="text-sm text-[#ff8c00] font-bold mt-2">${ex.detail}</span>
        `;
        previewContainer.appendChild(item);
    });
    // 4. เปิดใช้งานปุ่ม Confirm
    const assignBtn = document.getElementById('assign-btn');
    if (assignBtn) {
        assignBtn.disabled = false;
        assignBtn.className = "bg-[#ff8c00] text-black font-black px-12 py-5 rounded-2xl uppercase tracking-widest transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(255,140,0,0.3)] cursor-pointer";
    }
}
function assignToClient() {
    if (!currentSelectedTemplate)
        return;
    alert(`✅ จ่ายโปรแกรม "${currentSelectedTemplate}" ให้ลูกค้าเรียบร้อยแล้ว!`);
    window.location.href = 'progress_tracker.html';
}
document.addEventListener('DOMContentLoaded', () => {
    initNav();
});
//# sourceMappingURL=../../data/assign_program.js.map