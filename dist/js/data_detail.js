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
document.addEventListener('DOMContentLoaded', function () {
    var fullnameInput = document.getElementById('fullname');
    var ageInput = document.getElementById('age');
    var genderSelect = document.getElementById('gender');
    var positionSelect = document.getElementById('position');
    var phoneInput = document.getElementById('phone');
    var weightInput = document.getElementById('weight');
    var heightInput = document.getElementById('height');
    var submitButton = document.getElementById('submit-details-button');
    if (!fullnameInput || !ageInput || !genderSelect || !positionSelect || !phoneInput || !weightInput || !heightInput || !submitButton) {
        console.error("Data detail elements not found.");
        return;
    }
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission
        var fullname = fullnameInput.value.trim();
        var age = parseInt(ageInput.value.trim());
        var gender = genderSelect.value;
        var position = positionSelect.value;
        var phone = phoneInput.value.trim();
        var weight = parseFloat(weightInput.value.trim());
        var height = parseFloat(heightInput.value.trim());
        if (!fullname || isNaN(age) || !gender || !position || !phone || isNaN(weight) || isNaN(height)) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }
        var tempSignupDataString = localStorage.getItem('temp_signup');
        if (!tempSignupDataString) {
            alert("ไม่พบข้อมูลการลงทะเบียนชั่วคราว กรุณาลงทะเบียนใหม่");
            window.location.href = 'singup.html';
            return;
        }
        var tempSignupData = JSON.parse(tempSignupDataString);
        var newUserData = __assign(__assign({}, tempSignupData), { fullname: fullname, age: age, gender: gender, position: position, phone: phone, weight: weight, height: height, profileImg: '/img/Image-11 สำเนา.jpg', profileBackgroundImg: '/img/gym hub-2 สำเนา.png' // Default background image
         });
        var registeredUsersString = localStorage.getItem('registeredUsers');
        var registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];
        registeredUsers.push(newUserData);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.removeItem('temp_signup'); // Clear temporary data
        // Set the newly registered user as the currently logged-in user
        // Exclude password for security when storing in 'userData'
        var currentUserData = __assign({}, newUserData);
        delete currentUserData.password;
        localStorage.setItem('userData', JSON.stringify(currentUserData));
        window.location.href = 'finish_singup.html'; // Redirect to finish page
    });
});
