// =============================================
// Trainer Dashboard Page — Notifications, Logout & Agenda
// =============================================

// 1. จัดการ Dropdown แจ้งเตือน (ของเพื่อน)
var notiBtn = document.getElementById('noti-btn');
var notiDropdown = document.getElementById('noti-dropdown');
notiBtn === null || notiBtn === void 0 ? void 0 : notiBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    notiDropdown === null || notiDropdown === void 0 ? void 0 : notiDropdown.classList.toggle('hidden');
});

// 2. ปิด Dropdown เมื่อคลิกที่อื่น (ของเพื่อน)
document.addEventListener('click', function () {
    notiDropdown === null || notiDropdown === void 0 ? void 0 : notiDropdown.classList.add('hidden');
});

// 3. ระบบ Logout เบื้องต้น (ของเพื่อน)
var logoutBtn = document.getElementById('logout-btn');
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', function () {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
        window.location.href = './login.html';
    }
});

// =============================================
// 4. ระบบ Agenda (อัปเกรดใหม่ รองรับหลายคน + กดไปหน้า Assign Workout ได้)
// =============================================
var agendaContainer = document.getElementById('agenda-container');

// จำลองข้อมูลลูกค้าวันนี้ (ถ้าไม่มีลูกค้าให้เปลี่ยนเป็น todayClients = [] )
var todayClients = [
    {
        id: "c001",
        name: "BallKhonlhor_02",
        time: "10:00 AM - 11:00 AM",
        image: "../img/pho_member.png", // ใช้รูปตาม Path ที่เพื่อนตั้งไว้
        status: "Next up"
    }
];

if (todayClients.length === 0 && agendaContainer) {
    // กรณีว่าง: โชว์กรอบเส้นปะแบบที่เพื่อนทำ
    agendaContainer.className = "flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-700 rounded-xl";
    agendaContainer.innerHTML = `
        <p class="text-xl text-orange-500 font-bold uppercase tracking-widest">Available</p>
        <p class="text-gray-500 text-sm mt-2">คุณยังไม่มีคิวสอนสำหรับวันนี้</p>
    `;
} else if (agendaContainer) {
    // กรณีมีลูกค้า: เรนเดอร์การ์ด และทำให้คลิกไปหน้าจัดโปรแกรมได้
    agendaContainer.className = "flex flex-col gap-4"; // เอาเส้นปะออก
    agendaContainer.innerHTML = todayClients.map(function(client) {
        return `
        <div onclick="window.location.href='assign_program.html?clientId=${client.id}'" 
            class="flex items-center gap-4 w-full p-4 bg-[#2a2a2b] border border-gray-700 rounded-xl hover:border-[#ff8c00] transition-colors cursor-pointer group">
            <div class="w-20 h-20 bg-gray-700 rounded-xl overflow-hidden shrink-0">
                <img src="${client.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="client">
            </div>
            <div>
                <p class="font-bold text-lg text-white">${client.name}</p>
                <p class="text-orange-500 text-sm italic">${client.time}</p>
            </div>
            <button class="ml-auto bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">
                ${client.status}
            </button>
        </div>
        `;
    }).join('');
}