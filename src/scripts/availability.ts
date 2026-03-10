// =============================================
// Availability Page — GymHub
// =============================================

interface AvailabilityState {
    [key: string]: string[];
}

const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const allTimeSlots: string[] = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00",
];

let currentDay: string = 'Monday';

// จำลองข้อมูลที่มีอยู่แล้ว
let availabilityState: AvailabilityState = {
    Monday: ["09:00", "10:00", "17:00", "18:00"],
    Tuesday: ["13:00", "14:00", "15:00"],
    Wednesday: [],
    Thursday: ["08:00", "09:00", "10:00"],
    Friday: ["18:00", "19:00", "20:00"],
    Saturday: ["10:00", "11:00"],
    Sunday: []
};

// ฟังก์ชันเริ่มทำงานตอนเปิดหน้า
function initAvailability(): void {
    renderTabs();
    renderTimeSlots();
}

// เรนเดอร์แท็บเมนูด้านซ้าย
function renderTabs(): void {
    const tabsContainer = document.getElementById('day-tabs');
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    days.forEach(day => {
        const btn = document.createElement('button');
        const isActive = day === currentDay;

        btn.className = `w-full p-4 rounded-xl text-left uppercase transition-all ${isActive
            ? 'bg-white/10 border-l-4 border-[#FF6600] text-white font-bold'
            : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`;
        btn.innerText = day;
        btn.onclick = () => switchDay(day);

        tabsContainer.appendChild(btn);
    });
}

// สลับวัน
function switchDay(day: string): void {
    currentDay = day;
    const display = document.getElementById('current-day-display');
    if (display) display.innerText = day;
    renderTabs();
    renderTimeSlots();
}

// เรนเดอร์กล่องเวลา
function renderTimeSlots(): void {
    const gridContainer = document.getElementById('time-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const selectedSlots = availabilityState[currentDay];
    if (!selectedSlots) return;

    allTimeSlots.forEach(time => {
        const isAvailable = selectedSlots.includes(time);
        const btn = document.createElement('button');

        const baseClasses = "py-6 rounded-2xl font-black text-xl transition-all transform active:scale-95 duration-200 border mt-5";
        const activeClasses = "bg-[#FF6600] text-white border-[#FF6600] shadow-[0_0_15px_rgba(255,102,0,0.4)]";
        const inactiveClasses = "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white";

        btn.className = `${baseClasses} ${isAvailable ? activeClasses : inactiveClasses}`;
        btn.innerText = time;
        btn.onclick = () => toggleTimeSlot(time);

        gridContainer.appendChild(btn);
    });
}

// Toggle เพิ่ม/ลบ เวลา
function toggleTimeSlot(time: string): void {
    const selectedSlots = availabilityState[currentDay];
    if (!selectedSlots) return;

    if (selectedSlots.includes(time)) {
        availabilityState[currentDay] = selectedSlots.filter(t => t !== time);
    } else {
        availabilityState[currentDay]!.push(time);
    }

    renderTimeSlots();
}

// Save
function saveAvailability(): void {
    console.log("Saving Data to Database/LocalStorage:", availabilityState);
    alert("ตารางงานถูกบันทึกเรียบร้อยแล้ว! (เช็คข้อมูลที่ Console)");
}

// เรียกใช้งานครั้งแรก
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initAvailability();
});
