// =============================================
// Trainer Dashboard Page — Notifications, Logout & Agenda
// =============================================

// 1. จัดการ Dropdown แจ้งเตือน
const notiBtn = document.getElementById('noti-btn');
const notiDropdown = document.getElementById('noti-dropdown');

notiBtn?.addEventListener('click', (e: Event) => {
    e.stopPropagation();
    notiDropdown?.classList.toggle('hidden');
});

// 2. ปิด Dropdown เมื่อคลิกที่อื่น
document.addEventListener('click', () => {
    notiDropdown?.classList.add('hidden');
});

// 3. ระบบ Logout เบื้องต้น
const logoutBtn = document.getElementById('logout-btn');
logoutBtn?.addEventListener('click', () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
        // สมมติว่าล้าง session แล้วกลับหน้า login
        window.location.href = './login.html';
    }
});

// 4. ตัวอย่างการเช็ค Agenda (Logic สมมติ)
const hasClientToday: boolean = false; // ลองเปลี่ยนเป็น true เพื่อดูความต่าง
const agendaContainer = document.getElementById('agenda-container');

if (hasClientToday && agendaContainer) {
    agendaContainer.innerHTML = `
        <div class="flex items-center gap-4 w-full px-6">
            <div class="w-24 h-24 bg-gray-700 rounded-xl overflow-hidden">
                <img src="../img/pho_member.png" class="w-full h-full object-cover" alt="client">
            </div>
            <div>
                <p class="font-bold text-lg">Client Name_01</p>
                <p class="text-orange-500 text-sm italic">10:00 AM - 11:00 AM</p>
            </div>
            <button class="ml-auto bg-orange-500 text-black px-4 py-1 rounded-lg text-sm font-bold">Next up</button>
        </div>
    `;
    agendaContainer.classList.remove('border-dashed');
}
