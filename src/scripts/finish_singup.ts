window.onload = () => {
    // 1. ดึงข้อมูลจากลิ้นชักทั้ง 2 ส่วน
    const signupDataStr = localStorage.getItem('temp_signup');
    const detailDataStr = localStorage.getItem('temp_details');
    const displayArea = document.getElementById('display_data');

    if (signupDataStr && detailDataStr && displayArea) {
        // แกะกล่อง JSON
        const user = JSON.parse(signupDataStr);
        const details = JSON.parse(detailDataStr);

        // แสดงผลกล่องข้อมูล
        displayArea.classList.remove('hidden');

        // ฟังก์ชันช่วยใส่ข้อมูล (Helper)
        const setText = (id: string, text: string | number | undefined) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(text || '-');
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
        const finalData = { ...user, ...details };
        localStorage.setItem('userData', JSON.stringify(finalData));

    } else if (displayArea) {
        // กรณีไม่มีข้อมูล ให้แจ้งเตือนผู้ใช้
        displayArea.classList.remove('hidden');
        displayArea.innerHTML = `<p class="text-red-400 text-center text-xs">Error: Data not found. Please register again.</p>`;
    }
};