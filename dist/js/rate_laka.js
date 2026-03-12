var date = new Date();
var selectedDates = [];
var maxQuota = 15;
var currentPrice = 1800;
var currentPlanName = "15 Days Challenge";
function selectPlan(days, name, price) {
    if (selectedDates.length > 0 && !confirm("เปลี่ยนแพ็กเกจจะล้างข้อมูลที่เลือกใหม่?"))
        return;
    maxQuota = days;
    currentPrice = price;
    currentPlanName = name;
    selectedDates = [];
    document.querySelectorAll('.plan-card').forEach(function (el) { return el.classList.remove('plan-active'); });
    var planElement = document.getElementById("plan-".concat(days));
    if (planElement)
        planElement.classList.add('plan-active');
    updateUI();
}
function renderCalendar() {
    var grid = document.getElementById('calendarGrid');
    var monthYear = document.getElementById('currentMonthYear');
    if (!grid || !monthYear)
        return;
    var monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    monthYear.innerText = "".concat(monthNames[date.getMonth()], " ").concat(date.getFullYear() + 543);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    var daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var prevDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    grid.innerHTML = '';
    for (var i = firstDay; i > 0; i--) {
        grid.innerHTML += "<div class=\"calendar-btn text-gray-800 text-sm\">".concat(prevDays - i + 1, "</div>");
    }
    var _loop_1 = function (i) {
        var key = "".concat(date.getFullYear(), "-").concat(date.getMonth(), "-").concat(i);
        var isSelected = selectedDates.includes(key);
        var btn = document.createElement('button');
        btn.className = "calendar-btn rounded-xl text-sm transition ".concat(isSelected ? 'selected-date text-white' : 'bg-[#111] hover:bg-gray-800 text-gray-400');
        btn.innerText = i.toString();
        btn.onclick = function () { return toggleDate(key); };
        grid.appendChild(btn);
    };
    for (var i = 1; i <= daysInMonth; i++) {
        _loop_1(i);
    }
}
function toggleDate(key) {
    var idx = selectedDates.indexOf(key);
    if (idx > -1)
        selectedDates.splice(idx, 1);
    else {
        if (selectedDates.length >= maxQuota) {
            alert("ครบโควต้าแล้วครับ");
            return;
        }
        selectedDates.push(key);
    }
    updateUI();
}
function updateUI() {
    renderCalendar();
    var count = selectedDates.length;
    var progressLabel = document.getElementById('progressLabel');
    var progressBar = document.getElementById('progressBar');
    var badgeCount = document.getElementById('badgeCount');
    var list = document.getElementById('bookingList');
    var btn = document.getElementById('confirmBtn');
    if (progressLabel)
        progressLabel.innerText = "".concat(count, " / ").concat(maxQuota, " \u0E27\u0E31\u0E19");
    if (progressBar)
        progressBar.style.width = "".concat((count / maxQuota) * 100, "%");
    if (badgeCount)
        badgeCount.innerText = count.toString();
    if (list) {
        if (count === 0) {
            list.innerHTML = "<p class=\"text-center text-gray-700 py-20 text-xs\">\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19</p>";
        }
        else {
            selectedDates.sort(function (a, b) { return new Date(a).getTime() - new Date(b).getTime(); });
            list.innerHTML = selectedDates.map(function (k) {
                var parts = k.split('-').map(Number);
                // Note: Month in Date constructor is 0-indexed
                var dObj = new Date(parts[0], parts[1], parts[2]);
                var d = parts[2];
                var dName = new Intl.DateTimeFormat('th-TH', { weekday: 'long' }).format(dObj);
                return "<div class=\"bg-white text-black p-4 rounded-2xl flex justify-between items-center shadow-lg\">\n                    <div class=\"flex items-center gap-3\">\n                        <div class=\"bg-orange-500 text-white px-2 py-1 rounded-lg text-center leading-none\">\n                            <p class=\"text-lg font-black\">".concat(d.toString().padStart(2, '0'), "</p>\n                            <p class=\"text-[8px] uppercase\">\u0E21\u0E35.\u0E04.</p>\n                        </div>\n                        <div><p class=\"text-xs font-bold\">").concat(dName, "</p><p class=\"text-[9px] text-gray-500\">18:30 - 19:30</p></div>\n                    </div>\n                    <button onclick=\"toggleDate('").concat(k, "')\" class=\"material-icons text-gray-300 text-sm\">cancel</button>\n                </div>");
            }).join('');
        }
    }
    if (btn) {
        if (count === maxQuota) {
            btn.disabled = false;
            btn.className = "w-full bg-orange-500 text-black py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-orange-600 transition active:scale-95 cursor-pointer";
        }
        else {
            btn.disabled = true;
            btn.className = "w-full bg-gray-800 text-gray-500 py-4 rounded-2xl font-bold flex justify-center items-center gap-2 cursor-not-allowed";
        }
    }
}
function goToPayment() {
    var summaryPlanName = document.getElementById('summaryPlanName');
    var summaryTotal = document.getElementById('summaryTotal');
    var summaryStartDate = document.getElementById('summaryStartDate');
    var bookingPage = document.getElementById('booking-page');
    var paymentPage = document.getElementById('payment-page');
    if (summaryPlanName)
        summaryPlanName.innerText = currentPlanName;
    if (summaryTotal)
        summaryTotal.innerText = "\u0E3F".concat(currentPrice.toLocaleString());
    selectedDates.sort(function (a, b) { return new Date(a).getTime() - new Date(b).getTime(); });
    if (selectedDates.length > 0 && summaryStartDate) {
        var parts = selectedDates[0].split('-').map(Number);
        var y = parts[0];
        var m = parts[1];
        var d = parts[2];
        summaryStartDate.innerText = "".concat(d, " ").concat(new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(new Date(y, m, d)), " ").concat(y + 543);
    }
    if (bookingPage)
        bookingPage.classList.add('hidden');
    if (paymentPage)
        paymentPage.classList.remove('hidden');
    window.scrollTo(0, 0);
}
function changeMonth(v) {
    date.setMonth(date.getMonth() + v);
    renderCalendar();
}
function showSuccess() {
    var modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
    else {
        console.error("หา id 'success-modal' ไม่เจอครับ");
    }
}
window.selectPlan = selectPlan;
window.toggleDate = toggleDate;
window.goToPayment = goToPayment;
window.changeMonth = changeMonth;
window.showSuccess = showSuccess;
// Initialize calendar on load
renderCalendar();
initNav();
