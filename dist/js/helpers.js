"use strict";
// =============================================
// Shared Helper Functions — GymHub
// =============================================
// --- Default Image Paths ---
const DEFAULT_PROFILE_IMG = '/img/Image-11 สำเนา.jpg';
const DEFAULT_BG_IMG = '/img/gym hub-2 สำเนา.png';
// --- LocalStorage Helpers ---
/** อ่านรายชื่อผู้ใช้ทั้งหมดจาก localStorage */
function getRegisteredUsers() {
    const data = localStorage.getItem('registeredUsers');
    return data ? JSON.parse(data) : [];
}
/** บันทึกรายชื่อผู้ใช้ทั้งหมดลง localStorage */
function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}
/** อ่านข้อมูลผู้ใช้ที่ login อยู่ */
function getCurrentUser() {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
}
/** บันทึกข้อมูลผู้ใช้ที่ login อยู่ */
function setCurrentUser(user) {
    localStorage.setItem('userData', JSON.stringify(user));
}
/** ลบข้อมูลผู้ใช้ที่ login อยู่ (logout) */
function removeCurrentUser() {
    localStorage.removeItem('userData');
}
// --- DOM Helpers ---
/** ตั้งค่า textContent ของ element ตาม ID (null-safe) */
function setTextContent(id, value) {
    const el = document.getElementById(id);
    if (el)
        el.textContent = value;
}
/** ทำตัวอักษรแรกเป็นตัวพิมพ์ใหญ่ */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// --- Profile Display Helper ---
/** แสดงข้อมูลโปรไฟล์ลงใน DOM elements ตาม field IDs ที่กำหนด */
function populateProfileFields(userData, fieldIds) {
    if (fieldIds.profileUsername)
        setTextContent(fieldIds.profileUsername, userData.username || 'Guest');
    if (fieldIds.profilePosition)
        setTextContent(fieldIds.profilePosition, userData.position ? capitalize(userData.position) : 'N/A');
    if (fieldIds.username)
        setTextContent(fieldIds.username, userData.username || '-');
    if (fieldIds.email)
        setTextContent(fieldIds.email, userData.email || '-');
    if (fieldIds.fullname)
        setTextContent(fieldIds.fullname, userData.fullname || '-');
    if (fieldIds.age)
        setTextContent(fieldIds.age, userData.age ? userData.age.toString() : '-');
    if (fieldIds.gender)
        setTextContent(fieldIds.gender, userData.gender || '-');
    if (fieldIds.position)
        setTextContent(fieldIds.position, userData.position || '-');
    if (fieldIds.phone)
        setTextContent(fieldIds.phone, userData.phone || '-');
    if (fieldIds.weight)
        setTextContent(fieldIds.weight, userData.weight ? `${userData.weight} kg` : '-');
    if (fieldIds.height)
        setTextContent(fieldIds.height, userData.height ? `${userData.height} cm` : '-');
    if (fieldIds.posiUpdate)
        setTextContent(fieldIds.posiUpdate, userData.position || '-');
}
//# sourceMappingURL=../../data/helpers.js.map