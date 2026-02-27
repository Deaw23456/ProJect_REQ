function finiSh() {
    var _a, _b, _c, _d, _e, _f, _g;
    // รับค่าข้อมูลทั้งหมดจาก Form
    var fullname = (_a = document.getElementById('fullname')) === null || _a === void 0 ? void 0 : _a.value;
    var age = (_b = document.getElementById('age')) === null || _b === void 0 ? void 0 : _b.value;
    var gender = (_c = document.getElementById('gender')) === null || _c === void 0 ? void 0 : _c.value;
    var position = (_d = document.getElementById('position')) === null || _d === void 0 ? void 0 : _d.value;
    var phone = (_e = document.getElementById('phone')) === null || _e === void 0 ? void 0 : _e.value;
    var weight = (_f = document.getElementById('weight')) === null || _f === void 0 ? void 0 : _f.value;
    var height = (_g = document.getElementById('height')) === null || _g === void 0 ? void 0 : _g.value;
    if (!fullname || !age || !gender || !position || !phone || !weight || !height) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }
    var tempDetailData = {
        fullname: fullname,
        age: age,
        gender: gender,
        position: position,
        phone: phone,
        weight: weight,
        height: height
    };
    // บันทึกข้อมูลส่วนที่ 2 ลง localStorage
    localStorage.setItem('temp_details', JSON.stringify(tempDetailData));
    // ไปหน้าแสดงผลรวม
    window.location.href = 'finish_singup.html';
}
window.finiSh = finiSh;
