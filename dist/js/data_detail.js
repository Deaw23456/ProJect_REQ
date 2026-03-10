"use strict";
// =============================================
// Data Detail Page — Step 2: Personal Info
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const fullnameInput = document.getElementById('fullname');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const positionSelect = document.getElementById('position');
    const phoneInput = document.getElementById('phone');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const submitButton = document.getElementById('submit-details-button');
    if (!fullnameInput || !ageInput || !genderSelect || !positionSelect || !phoneInput || !weightInput || !heightInput || !submitButton) {
        console.error("Data detail elements not found.");
        return;
    }
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const fullname = fullnameInput.value.trim();
        const age = parseInt(ageInput.value.trim());
        const gender = genderSelect.value;
        const position = positionSelect.value;
        const phone = phoneInput.value.trim();
        const weight = parseFloat(weightInput.value.trim());
        const height = parseFloat(heightInput.value.trim());
        if (!fullname || isNaN(age) || !gender || !position || !phone || isNaN(weight) || isNaN(height)) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }
        const tempSignupDataString = localStorage.getItem('temp_signup');
        if (!tempSignupDataString) {
            alert("ไม่พบข้อมูลการลงทะเบียนชั่วคราว กรุณาลงทะเบียนใหม่");
            window.location.href = 'singup.html';
            return;
        }
        const tempSignupData = JSON.parse(tempSignupDataString);
        const newUserData = {
            ...tempSignupData,
            fullname,
            age,
            gender,
            position,
            phone,
            weight,
            height,
            profileImg: DEFAULT_PROFILE_IMG,
            profileBackgroundImg: DEFAULT_BG_IMG
        };
        // บันทึกลง registeredUsers
        const registeredUsers = getRegisteredUsers();
        registeredUsers.push(newUserData);
        saveRegisteredUsers(registeredUsers);
        localStorage.removeItem('temp_signup');
        // ตั้งเป็นผู้ใช้ที่ login อยู่ (ไม่เก็บ password)
        const currentUserData = { ...newUserData };
        delete currentUserData.password;
        setCurrentUser(currentUserData);
        // Redirect based on position
        if (newUserData.position === 'trainer') {
            window.location.href = 'trainer_profile.html';
        }
        else {
            window.location.href = 'finish_singup.html';
        }
    });
});
//# sourceMappingURL=../../data/data_detail.js.map