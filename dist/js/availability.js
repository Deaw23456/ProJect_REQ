// =============================================
// Availability Page — GymHub
// =============================================
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var allTimeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00",
];
var currentDay = 'Monday';
// จำลองข้อมูลที่มีอยู่แล้ว
var availabilityState = {
    Monday: ["09:00", "10:00", "17:00", "18:00"],
    Tuesday: ["13:00", "14:00", "15:00"],
    Wednesday: [],
    Thursday: ["08:00", "09:00", "10:00"],
    Friday: ["18:00", "19:00", "20:00"],
    Saturday: ["10:00", "11:00"],
    Sunday: []
};
// ฟังก์ชันเริ่มทำงานตอนเปิดหน้า
function initAvailability() {
    renderTabs();
    renderTimeSlots();
}
// เรนเดอร์แท็บเมนูด้านซ้าย
function renderTabs() {
    var tabsContainer = document.getElementById('day-tabs');
    if (!tabsContainer)
        return;
    tabsContainer.innerHTML = '';
    days.forEach(function (day) {
        var btn = document.createElement('button');
        var isActive = day === currentDay;
        btn.className = "w-full p-4 rounded-xl text-left uppercase transition-all ".concat(isActive
            ? 'bg-white/10 border-l-4 border-[#FF6600] text-white font-bold'
            : 'text-gray-500 hover:text-white hover:bg-white/5');
        btn.innerText = day;
        btn.onclick = function () { return switchDay(day); };
        tabsContainer.appendChild(btn);
    });
}
// สลับวัน
function switchDay(day) {
    currentDay = day;
    var display = document.getElementById('current-day-display');
    if (display)
        display.innerText = day;
    renderTabs();
    renderTimeSlots();
}
// เรนเดอร์กล่องเวลา
function renderTimeSlots() {
    var gridContainer = document.getElementById('time-grid');
    if (!gridContainer)
        return;
    gridContainer.innerHTML = '';
    var selectedSlots = availabilityState[currentDay];
    if (!selectedSlots)
        return;
    allTimeSlots.forEach(function (time) {
        var isAvailable = selectedSlots.includes(time);
        var btn = document.createElement('button');
        var baseClasses = "py-6 rounded-2xl font-black text-xl transition-all transform active:scale-95 duration-200 border mt-5";
        var activeClasses = "bg-[#FF6600] text-white border-[#FF6600] shadow-[0_0_15px_rgba(255,102,0,0.4)]";
        var inactiveClasses = "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white";
        btn.className = "".concat(baseClasses, " ").concat(isAvailable ? activeClasses : inactiveClasses);
        btn.innerText = time;
        btn.onclick = function () { return toggleTimeSlot(time); };
        gridContainer.appendChild(btn);
    });
}
// Toggle เพิ่ม/ลบ เวลา
function toggleTimeSlot(time) {
    var selectedSlots = availabilityState[currentDay];
    if (!selectedSlots)
        return;
    if (selectedSlots.includes(time)) {
        availabilityState[currentDay] = selectedSlots.filter(function (t) { return t !== time; });
    }
    else {
        availabilityState[currentDay].push(time);
    }
    renderTimeSlots();
}
// Save
function saveAvailability() {
    console.log("Saving Data to Database/LocalStorage:", availabilityState);
    alert("ตารางงานถูกบันทึกเรียบร้อยแล้ว! (เช็คข้อมูลที่ Console)");
}
// เรียกใช้งานครั้งแรก
document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initAvailability();
});
