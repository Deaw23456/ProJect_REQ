// =============================================
// Trainer Dashboard Page — Notifications, Logout & Agenda
// =============================================
// Initialize navigation
initNav();
// 1. จัดการ Dropdown แจ้งเตือน
var notiBtn = document.getElementById('noti-btn');
var notiDropdown = document.getElementById('noti-dropdown');
notiBtn === null || notiBtn === void 0 ? void 0 : notiBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    notiDropdown === null || notiDropdown === void 0 ? void 0 : notiDropdown.classList.toggle('hidden');
});
// 2. ปิด Dropdown เมื่อคลิกที่อื่น
document.addEventListener('click', function () {
    notiDropdown === null || notiDropdown === void 0 ? void 0 : notiDropdown.classList.add('hidden');
});
// 3. ระบบ Logout เบื้องต้น
var logoutBtn = document.getElementById('logout-btn');
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', function () {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
        // สมมติว่าล้าง session แล้วกลับหน้า login
        window.location.href = './login.html';
    }
});
// 4. ตัวอย่างการเช็ค Agenda (Logic สมมติ)
var hasClientToday = false; // ลองเปลี่ยนเป็น true เพื่อดูความต่าง
var agendaContainer = document.getElementById('agenda-container');
if (hasClientToday && agendaContainer) {
    agendaContainer.innerHTML = "\n        <div class=\"flex items-center gap-4 w-full px-6\">\n            <div class=\"w-24 h-24 bg-gray-700 rounded-xl overflow-hidden\">\n                <img src=\"../img/pho_member.png\" class=\"w-full h-full object-cover\" alt=\"client\">\n            </div>\n            <div>\n                <p class=\"font-bold text-lg\">Client Name_01</p>\n                <p class=\"text-orange-500 text-sm italic\">10:00 AM - 11:00 AM</p>\n            </div>\n            <button class=\"ml-auto bg-orange-500 text-black px-4 py-1 rounded-lg text-sm font-bold\">Next up</button>\n        </div>\n    ";
    agendaContainer.classList.remove('border-dashed');
}
// 5. แสดงรายชื่อ member ที่รอการอนุมัติ
var memberListContainer = document.getElementById('member-list-container');
var noMembersMsg = document.getElementById('no-members-msg');
var pendingCount = document.getElementById('pending-count');
if (memberListContainer) {
    var members = getRegisteredUsers().filter(function (user) { return user.position === 'member'; });
    // ซ่อนข้อความ empty state ถ้ามี member และอัพเดต badge
    if (members.length > 0 && noMembersMsg) {
        noMembersMsg.style.display = 'none';
    }
    if (pendingCount) {
        pendingCount.textContent = "".concat(members.length, " New");
    }
    members.forEach(function (member) {
        var _a;
        var card = document.createElement('div');
        card.className = "bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center transition-all duration-300 hover:border-[#ff8c00]/50 hover:bg-white/10 hover:shadow-lg";
        card.innerHTML = "\n            <a href=\"/page/view_profile.html?username=".concat(member.username, "\" class=\"flex-grow cursor-pointer\">\n                <div>\n                    <p class=\"text-md font-bold text-white\">").concat(member.fullname || member.username, "</p>\n                    <p class=\"text-xs text-[#ff8c00]\">").concat(member.position ? capitalize(member.position) : 'N/A', "</p>\n                </div>\n            </a>\n            <button class=\"approve-btn bg-[#ff8c00] text-black font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_0_10px_rgba(255,140,0,0.3)] ml-4 flex-shrink-0\">\n                Approve\n            </button>\n        ");
        (_a = card.querySelector('.approve-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = "/page/view_profile.html?username=".concat(member.username);
        });
        memberListContainer.appendChild(card);
    });
}
