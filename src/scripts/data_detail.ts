function finiSh() {
    // รับค่าข้อมูลทั้งหมดจาก Form
    const fullname = (document.getElementById('fullname') as HTMLInputElement)?.value;
    const age = (document.getElementById('age') as HTMLInputElement)?.value;
    const gender = (document.getElementById('gender') as HTMLSelectElement)?.value;
    const position = (document.getElementById('position') as HTMLSelectElement)?.value;
    const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
    const weight = (document.getElementById('weight') as HTMLInputElement)?.value;
    const height = (document.getElementById('height') as HTMLInputElement)?.value;

    if (!fullname || !age || !gender || !position || !phone || !weight || !height) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const tempDetailData = {
        fullname,
        age,
        gender,
        position,
        phone,
        weight,
        height
    };

    // บันทึกข้อมูลส่วนที่ 2 ลง localStorage
    localStorage.setItem('temp_details', JSON.stringify(tempDetailData));

    // ไปหน้าแสดงผลรวม
    window.location.href = 'finish_singup.html';
}

(window as any).finiSh = finiSh;