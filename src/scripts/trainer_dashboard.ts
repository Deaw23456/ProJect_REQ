// =============================================
// Trainer Dashboard Page — Notifications, Logout & Agenda
// =============================================

// Initialize navigation
initNav();


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

// 5. แสดงรายชื่อ member ที่รอการอนุมัติ
const memberListContainer = document.getElementById('member-list-container');
const noMembersMsg = document.getElementById('no-members-msg');
const pendingCount = document.getElementById('pending-count');

if (memberListContainer) {
    const members = getRegisteredUsers().filter(user => user.position === 'member');

    // ซ่อนข้อความ empty state ถ้ามี member และอัพเดต badge
    if (members.length > 0 && noMembersMsg) {
        noMembersMsg.style.display = 'none';
    }
    if (pendingCount) {
        pendingCount.textContent = `${members.length} New`;
    }

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = "bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center transition-all duration-300 hover:border-[#ff8c00]/50 hover:bg-white/10 hover:shadow-lg";
        card.innerHTML = `
            <a href="/page/view_profile.html?username=${member.username}" class="flex-grow cursor-pointer">
                <div>
                    <p class="text-md font-bold text-white">${member.fullname || member.username}</p>
                    <p class="text-xs text-[#ff8c00]">${member.position ? capitalize(member.position) : 'N/A'}</p>
                </div>
            </a>
            <button class="approve-btn bg-[#ff8c00] text-black font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_0_10px_rgba(255,140,0,0.3)] ml-4 flex-shrink-0">
                Approve
            </button>
        `;

        card.querySelector('.approve-btn')?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/page/view_profile.html?username=${member.username}`;
        });

        memberListContainer.appendChild(card);
    });
}
