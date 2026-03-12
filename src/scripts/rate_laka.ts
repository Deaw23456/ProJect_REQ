declare function initNav(): void;

let date: Date = new Date();
let selectedDates: string[] = [];
let maxQuota: number = 15;
let currentPrice: number = 1800;
let currentPlanName: string = "15 Days Challenge";

function selectPlan(days: number, name: string, price: number): void {
    if (selectedDates.length > 0 && !confirm("เปลี่ยนแพ็กเกจจะล้างข้อมูลที่เลือกใหม่?")) return;
    maxQuota = days;
    currentPrice = price;
    currentPlanName = name;
    selectedDates = [];
    document.querySelectorAll('.plan-card').forEach(el => el.classList.remove('plan-active'));
    const planElement = document.getElementById(`plan-${days}`);
    if (planElement) planElement.classList.add('plan-active');
    updateUI();
}

function renderCalendar(): void {
    const grid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('currentMonthYear');
    if (!grid || !monthYear) return;

    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    monthYear.innerText = `${monthNames[date.getMonth()]} ${date.getFullYear() + 543}`;

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    grid.innerHTML = '';
    for (let i = firstDay; i > 0; i--) {
        grid.innerHTML += `<div class="calendar-btn text-gray-800 text-sm">${prevDays - i + 1}</div>`;
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const key = `${date.getFullYear()}-${date.getMonth()}-${i}`;
        const isSelected = selectedDates.includes(key);
        const btn = document.createElement('button');
        btn.className = `calendar-btn rounded-xl text-sm transition ${isSelected ? 'selected-date text-white' : 'bg-[#111] hover:bg-gray-800 text-gray-400'}`;
        btn.innerText = i.toString();
        btn.onclick = () => toggleDate(key);
        grid.appendChild(btn);
    }
}

function toggleDate(key: string): void {
    const idx = selectedDates.indexOf(key);
    if (idx > -1) selectedDates.splice(idx, 1);
    else {
        if (selectedDates.length >= maxQuota) {
             alert("ครบโควต้าแล้วครับ");
             return;
        }
        selectedDates.push(key);
    }
    updateUI();
}

function updateUI(): void {
    renderCalendar();
    const count = selectedDates.length;
    const progressLabel = document.getElementById('progressLabel');
    const progressBar = document.getElementById('progressBar');
    const badgeCount = document.getElementById('badgeCount');
    const list = document.getElementById('bookingList');
    const btn = document.getElementById('confirmBtn') as HTMLButtonElement | null;

    if (progressLabel) progressLabel.innerText = `${count} / ${maxQuota} วัน`;
    if (progressBar) progressBar.style.width = `${(count / maxQuota) * 100}%`;
    if (badgeCount) badgeCount.innerText = count.toString();

    if (list) {
        if (count === 0) {
            list.innerHTML = `<p class="text-center text-gray-700 py-20 text-xs">ยังไม่ได้เลือกวัน</p>`;
        } else {
            selectedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
            list.innerHTML = selectedDates.map(k => {
                const parts = k.split('-').map(Number);
                 // Note: Month in Date constructor is 0-indexed
                const dObj = new Date(parts[0]!, parts[1]!, parts[2]!);
                const d = parts[2];
                const dName = new Intl.DateTimeFormat('th-TH', { weekday: 'long' }).format(dObj);
                return `<div class="bg-white text-black p-4 rounded-2xl flex justify-between items-center shadow-lg">
                    <div class="flex items-center gap-3">
                        <div class="bg-orange-500 text-white px-2 py-1 rounded-lg text-center leading-none">
                            <p class="text-lg font-black">${d!.toString().padStart(2, '0')}</p>
                            <p class="text-[8px] uppercase">มี.ค.</p>
                        </div>
                        <div><p class="text-xs font-bold">${dName}</p><p class="text-[9px] text-gray-500">18:30 - 19:30</p></div>
                    </div>
                    <button onclick="toggleDate('${k}')" class="material-icons text-gray-300 text-sm">cancel</button>
                </div>`;
            }).join('');
        }
    }

    if (btn) {
        if (count === maxQuota) {
            btn.disabled = false;
            btn.className = "w-full bg-orange-500 text-black py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-orange-600 transition active:scale-95 cursor-pointer";
        } else {
            btn.disabled = true;
            btn.className = "w-full bg-gray-800 text-gray-500 py-4 rounded-2xl font-bold flex justify-center items-center gap-2 cursor-not-allowed";
        }
    }
}

function goToPayment(): void {
    const summaryPlanName = document.getElementById('summaryPlanName');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryStartDate = document.getElementById('summaryStartDate');
    const bookingPage = document.getElementById('booking-page');
    const paymentPage = document.getElementById('payment-page');

    if (summaryPlanName) summaryPlanName.innerText = currentPlanName;
    if (summaryTotal) summaryTotal.innerText = `฿${currentPrice.toLocaleString()}`;
    
    selectedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    if (selectedDates.length > 0 && summaryStartDate) {
        const parts = selectedDates[0]!.split('-').map(Number);
        const y = parts[0]!;
        const m = parts[1]!;
        const d = parts[2]!;
        summaryStartDate.innerText = `${d} ${new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(new Date(y, m, d))} ${y + 543}`;
    }

    if (bookingPage) bookingPage.classList.add('hidden');
    if (paymentPage) paymentPage.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function changeMonth(v: number): void { 
    date.setMonth(date.getMonth() + v); 
    renderCalendar(); 
}

function showSuccess(): void {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error("หา id 'success-modal' ไม่เจอครับ");
    }
}

(window as any).selectPlan = selectPlan;
(window as any).toggleDate = toggleDate;
(window as any).goToPayment = goToPayment;
(window as any).changeMonth = changeMonth;
(window as any).showSuccess = showSuccess;

// Initialize calendar on load
renderCalendar();
initNav();