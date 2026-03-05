interface UserData {
    username: string;
    email: string;
    password?: string;
    fullname?: string;
    age?: number;
    gender?: string;
    position?: 'member' | 'trainer';
    phone?: string;
    weight?: number;
    height?: number;
    profileImg?: string;
    profileBackgroundImg?: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const fullnameInput = document.getElementById('fullname') as HTMLInputElement;
    const ageInput = document.getElementById('age') as HTMLInputElement;
    const genderSelect = document.getElementById('gender') as HTMLSelectElement;
    const positionSelect = document.getElementById('position') as HTMLSelectElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const weightInput = document.getElementById('weight') as HTMLInputElement;
    const heightInput = document.getElementById('height') as HTMLInputElement;
    const submitButton = document.getElementById('submit-details-button');

    if (!fullnameInput || !ageInput || !genderSelect || !positionSelect || !phoneInput || !weightInput || !heightInput || !submitButton) {
        console.error("Data detail elements not found.");
        return;
    }

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission

        const fullname = fullnameInput.value.trim();
        const age = parseInt(ageInput.value.trim());
        const gender = genderSelect.value;
        const position = positionSelect.value as 'member' | 'trainer';
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

        const tempSignupData: UserData = JSON.parse(tempSignupDataString);

        const newUserData: UserData = {
            ...tempSignupData,
            fullname,
            age,
            gender,
            position,
            phone,
            weight,
            height,
            profileImg: '/img/Image-11 สำเนา.jpg', // Default profile image
            profileBackgroundImg: '/img/gym hub-2 สำเนา.png' // Default background image
        };

        const registeredUsersString = localStorage.getItem('registeredUsers');
        const registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];
        registeredUsers.push(newUserData);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.removeItem('temp_signup'); // Clear temporary data

        // Set the newly registered user as the currently logged-in user
        // Exclude password for security when storing in 'userData'
        const currentUserData: UserData = { ...newUserData };
        delete currentUserData.password;
        localStorage.setItem('userData', JSON.stringify(currentUserData));

        window.location.href = 'finish_singup.html'; // Redirect to finish page
    });
});