var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
window.onload = function () {
    // 1. ดึงข้อมูลจากลิ้นชักทั้ง 2 ส่วน
    var signupDataStr = localStorage.getItem('temp_signup');
    var detailDataStr = localStorage.getItem('temp_details');
    var displayArea = document.getElementById('display_data');
    if (signupDataStr && detailDataStr && displayArea) {
        // แกะกล่อง JSON
        var user = JSON.parse(signupDataStr);
        var details = JSON.parse(detailDataStr);
        // แสดงผลกล่องข้อมูล
        displayArea.classList.remove('hidden');
        // ฟังก์ชันช่วยใส่ข้อมูล (Helper)
        var setText = function (id, text) {
            var el = document.getElementById(id);
            if (el)
                el.textContent = String(text || '-');
        };
        // ยัดข้อมูลลง ID ต่างๆ ให้ตรงกับ HTML
        setText('show_username', user.username);
        setText('show_email', user.email);
        setText('show_fullname', details.fullname);
        setText('show_gender', details.gender);
        setText('show_age', details.age);
        setText('show_phone', details.phone);
        setText('show_position', details.position);
        setText('show_weight', details.weight);
        setText('show_height', details.height);
        setText('posiupdate', details.position);
        // --- จุดสำคัญ: บันทึกข้อมูลตัวจริงลง 'userData' เพื่อไว้ใช้ Login ---
        var finalData = __assign(__assign(__assign({}, user), details), { profileImg: '/img/Image-11 สำเนา.jpg', profileBackgroundImg: 'https://via.placeholder.com/1500x400?text=Profile+Background' // Add default background
         });
        localStorage.setItem('userData', JSON.stringify(finalData));
    }
    else if (displayArea) {
        // กรณีไม่มีข้อมูล ให้แจ้งเตือนผู้ใช้
        displayArea.classList.remove('hidden');
        displayArea.innerHTML = "<p class=\"text-red-400 text-center text-xs\">Error: Data not found. Please register again.</p>";
    }
};
