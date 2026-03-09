// =============================================
// Trainer Dashboard Page — Notifications, Logout & Agenda
// =============================================
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
