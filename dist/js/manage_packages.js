var PACKAGES_DB_KEY = 'gymhub_packages';
var packagesData = JSON.parse(localStorage.getItem(PACKAGES_DB_KEY) || 'null') || [
    {
        name: "Basic Starter",
        price: 4500,
        sessions: 10,
        desc: "เหมาะสำหรับผู้เริ่มต้นที่ต้องการปูพื้นฐานการออกกำลังกายที่ถูกต้อง",
        popular: false
    },
    {
        name: "Pro Transformation",
        price: 8000,
        sessions: 20,
        desc: "เปลี่ยนรูปร่างแบบเร่งด่วน พร้อมดูแลโภชนาการแบบจัดเต็ม",
        popular: true
    }
];
var editingIndex = -1;
function renderPackages() {
    var grid = document.getElementById('package-grid');
    if (!grid)
        return;
    grid.innerHTML = '';
    packagesData.forEach(function (pkg, index) {
        var card = document.createElement('div');
        if (pkg.popular) {
            card.className = "bg-[#1a1005] border-2 border-[#ff8c00] rounded-[2rem] p-8 flex flex-col relative transition-all duration-300 transform md:scale-105 shadow-[0_0_30px_rgba(255,140,0,0.15)] z-10";
            card.innerHTML = "<div class=\"absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff8c00] text-black font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-lg\">Most Popular</div>";
        }
        else {
            card.className = "bg-[#151517] border border-gray-800 rounded-[2rem] p-8 flex flex-col relative transition-all duration-300 hover:border-[#ff8c00]/50 hover:shadow-[0_10px_30px_rgba(255,140,0,0.1)] group";
            card.innerHTML = '';
        }
        card.innerHTML += "\n            <h2 class=\"text-[#ff8c00] font-black uppercase tracking-widest text-sm mb-2\">".concat(pkg.name, "</h2>\n            <div class=\"flex items-baseline gap-2 mb-6\">\n                <span class=\"text-5xl font-black text-white\">\u0E3F").concat(Number(pkg.price).toLocaleString(), "</span>\n            </div>\n            <p class=\"text-gray-400 text-sm mb-8 pb-6 border-b border-gray-800\">").concat(pkg.desc, "</p>\n            \n            <ul class=\"space-y-4 mb-8 flex-1\">\n                <li class=\"flex items-center gap-3 text-sm font-bold text-gray-300\">\n                    <svg class=\"w-5 h-5 text-[#ff8c00]\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"3\" d=\"M5 13l4 4L19 7\"></path></svg>\n                    \u0E40\u0E23\u0E35\u0E22\u0E19\u0E15\u0E31\u0E27\u0E15\u0E48\u0E2D\u0E15\u0E31\u0E27 ").concat(pkg.sessions, " \u0E04\u0E23\u0E31\u0E49\u0E07\n                </li>\n            </ul>\n\n            <div class=\"flex gap-2 mt-auto\">\n                <button onclick=\"editPackage(").concat(index, ")\" class=\"flex-1 bg-[").concat(pkg.popular ? '#ff8c00' : '#1f1f22', "] text-").concat(pkg.popular ? 'black' : 'white', " hover:bg-white hover:text-black border border-transparent font-bold py-3 rounded-xl transition-all uppercase text-xs tracking-wider\">Edit</button>\n                \n                <button onclick=\"deletePackage(").concat(index, ")\" class=\"bg-[#1f1f22] border border-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 text-gray-400 font-bold p-3 rounded-xl transition-all\">\n                    <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\"></path></svg>\n                </button>\n            </div>\n        ");
        grid.appendChild(card);
    });
    var addBtnBox = document.createElement('div');
    addBtnBox.onclick = openModal;
    addBtnBox.className = "border-2 border-dashed border-gray-700 rounded-[2rem] p-8 flex flex-col items-center justify-center text-gray-500 hover:text-[#ff8c00] hover:border-[#ff8c00] hover:bg-white/5 transition-all duration-300 cursor-pointer min-h-[400px]";
    addBtnBox.innerHTML = "\n        <div class=\"w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 transition-transform group-hover:scale-110\">\n            <span class=\"text-3xl font-black\">+</span>\n        </div>\n        <h3 class=\"font-bold text-lg\">Create New Package</h3>\n        <p class=\"text-xs mt-2 text-center opacity-70\">\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E47\u0E01\u0E40\u0E01\u0E08\u0E23\u0E32\u0E04\u0E32\u0E43\u0E2B\u0E21\u0E48<br>\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E33\u0E40\u0E2A\u0E19\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32</p>\n    ";
    grid.appendChild(addBtnBox);
}
function openModal() {
    editingIndex = -1;
    document.getElementById('modal-title').innerText = "Add New Package";
    document.getElementById('pkg-name').value = '';
    document.getElementById('pkg-price').value = '';
    document.getElementById('pkg-sessions').value = '';
    document.getElementById('pkg-desc').value = '';
    showModalUI();
}
function editPackage(index) {
    editingIndex = index;
    document.getElementById('modal-title').innerText = "Edit Package";
    var pkg = packagesData[index];
    document.getElementById('pkg-name').value = pkg.name;
    document.getElementById('pkg-price').value = pkg.price.toString();
    document.getElementById('pkg-sessions').value = pkg.sessions.toString();
    document.getElementById('pkg-desc').value = pkg.desc;
    showModalUI();
}
function savePackage() {
    var name = document.getElementById('pkg-name').value;
    var price = document.getElementById('pkg-price').value;
    var sessions = document.getElementById('pkg-sessions').value;
    var desc = document.getElementById('pkg-desc').value;
    if (!name || !price || !sessions) {
        alert("กรุณากรอก ชื่อแพ็กเกจ, ราคา, และจำนวนครั้ง ให้ครบถ้วนครับ!");
        return;
    }
    var newPkg = { name: name, price: price, sessions: sessions, desc: desc, popular: false };
    if (editingIndex === -1) {
        packagesData.push(newPkg);
    }
    else {
        newPkg.popular = packagesData[editingIndex].popular;
        packagesData[editingIndex] = newPkg;
    }
    saveToLocalStorage();
    closeModal();
    renderPackages();
}
function deletePackage(index) {
    if (confirm("\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E41\u0E1E\u0E47\u0E01\u0E40\u0E01\u0E08 \"".concat(packagesData[index].name, "\"?"))) {
        packagesData.splice(index, 1);
        saveToLocalStorage();
        renderPackages();
    }
}
function saveAndExit() {
    alert('✅ บันทึกแพ็กเกจทั้งหมดเรียบร้อยแล้ว!');
    window.location.href = 'trainer_profile.html';
}
var modal = document.getElementById('package-modal');
var modalContent = document.getElementById('modal-content');
function showModalUI() {
    modal.classList.remove('hidden');
    setTimeout(function () {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-90');
        modalContent.classList.add('scale-100');
    }, 10);
}
function closeModal() {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    setTimeout(function () { return modal.classList.add('hidden'); }, 300);
}
function saveToLocalStorage() {
    localStorage.setItem(PACKAGES_DB_KEY, JSON.stringify(packagesData));
}
window.openModal = openModal;
window.editPackage = editPackage;
window.savePackage = savePackage;
window.deletePackage = deletePackage;
window.saveAndExit = saveAndExit;
window.closeModal = closeModal;
window.onload = function () {
    initNav();
    renderPackages();
};
