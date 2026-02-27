"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function finiSh() {
    // 1. ไปดึง "กล่องชั่วคราว" จากหน้าแรกมาแกะดู
    var rawData = localStorage.getItem('temp_signup');
    var step1Data = rawData ? JSON.parse(rawData) : {};
    // 2. ดึงข้อมูลร่างกายจากหน้าปัจจุบัน
    var name = document.getElementById('fullname').value;
    var age = parseInt(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value);
    if (!name || isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("กรอกข้อมูลร่างกายให้ครบและถูกต้องด้วยนะ!");
        return;
    }
    // 3. --- รวมร่างข้อมูล (Merging) ---
    var finalUserData = __assign(__assign({}, step1Data), { fullname: name, age: age, weight: weight, height: height });
    // 4. บันทึกลงลิ้นชักตัวจริงชื่อ 'userData' (เพื่อให้ Login เรียกใช้ได้)
    localStorage.setItem("userData", JSON.stringify(finalUserData));
    // 5. ล้างลิ้นชักชั่วคราวทิ้งเพื่อความสะอาด
    localStorage.removeItem('temp_signup');
    alert("สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่ GymHub");
    window.location.href = 'finish_singup.html';
}
