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
    // 1. ดึงข้อมูลจากลิ้นชักทั้ง 2 ส่วน
    const signupDataStr = localStorage.getItem('temp_signup');
    const displayArea = document.getElementById('display_data');

    // Retrieve the currently logged-in user's data to display a personalized message
    const userDataString = localStorage.getItem('userData');

    if (userDataString && displayArea) {
        const userData: UserData = JSON.parse(userDataString);
        displayArea.classList.remove('hidden');

        // Clear temporary signup details if they still exist (should be cleared by data_detail.ts)
        localStorage.removeItem('temp_signup');
        localStorage.removeItem('temp_details'); // Ensure this is cleared if it was ever set

    } else if (displayArea) {
        // Fallback if userData is not found (e.g., direct access to finish_singup.html)
        displayArea.classList.remove('hidden');
        displayArea.innerHTML = `
            <h2 class="text-2xl font-bold text-white mb-4">สมัครสมาชิกสำเร็จ!</h2>
            <p class="text-white text-lg">ยินดีต้อนรับสู่ GymHub!</p>
            <p class="text-gray-400 text-sm mt-4">คุณสามารถไปที่หน้าโปรไฟล์ของคุณได้เลย</p>
            <div class="mt-6">
                <a href="/index.html" class="bg-[#ff8c00] text-black py-2 px-4 rounded-md hover:bg-[#ff8c00]/90 font-bold">กลับหน้าหลัก</a>
            </div>
        `;
    }
});