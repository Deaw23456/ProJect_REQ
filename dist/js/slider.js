// เลือกรูปภาพทั้งหมดที่มี class เป็น 'slide'
var slides = document.querySelectorAll('.slide');
var slideInterval = 3000; // เวลาในการเปลี่ยนรูป (3000ms = 3 วินาที)
var currentSlideIndex = 0;
function showSlide(index) {
    slides.forEach(function (slide, i) {
        // ถ้า index ตรงกับลำดับปัจจุบัน ให้แสดงรูป นั้น (block) นอกนั้นซ่อน (none)
        if (i === index) {
            slide.style.display = 'block';
        }
        else {
            slide.style.display = 'none';
        }
    });
}
function startSlider() {
    if (slides.length === 0)
        return; // ถ้าไม่มีรูปภาพให้จบการทำงาน
    showSlide(currentSlideIndex); // แสดงรูปแรก
    // ตั้งเวลาให้เปลี่ยนรูปทุก 3 วินาที
    setInterval(function () {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }, slideInterval);
}
// เริ่มทำงานเมื่อโหลดหน้าเว็บเสร็จ
document.addEventListener('DOMContentLoaded', startSlider);
