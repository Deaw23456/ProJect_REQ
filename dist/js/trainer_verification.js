"use strict";
/**
 * Sets up a file input to preview the selected image.
 * @param inputId The ID of the file input element.
 * @param previewId The ID of the img element for the preview.
 * @param iconId The ID of the placeholder icon element.
 * @param removeBtnId The ID of the button to remove the image.
 */
function setupImagePreview(inputId, previewId, iconId, removeBtnId) {
    const fileInput = document.getElementById(inputId);
    const imagePreview = document.getElementById(previewId);
    const placeholderIcon = document.getElementById(iconId);
    const removeBtn = document.getElementById(removeBtnId);
    if (!fileInput || !imagePreview || !placeholderIcon || !removeBtn) {
        console.error(`One or more elements not found for preview setup: ${inputId}, ${previewId}, ${iconId}, ${removeBtnId}`);
        return;
    }
    fileInput.addEventListener('change', (event) => {
        const target = event.target;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                    placeholderIcon.classList.add('hidden');
                    removeBtn.classList.remove('hidden');
                }
            };
            reader.readAsDataURL(file);
        }
    });
    removeBtn.addEventListener('click', () => {
        // Clear the file input
        fileInput.value = '';
        // Reset the preview
        imagePreview.src = '#'; // Use a placeholder to avoid broken image icon
        imagePreview.classList.add('hidden');
        placeholderIcon.classList.remove('hidden');
        // Hide the remove button again
        removeBtn.classList.add('hidden');
    });
}
// Initialize the image previews on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup image previews
    setupImagePreview('id-card-upload-input', 'id-card-preview', 'id-card-icon', 'id-card-remove-btn');
    setupImagePreview('certificate-upload-input', 'certificate-preview', 'certificate-icon', 'certificate-remove-btn');
    // Handle form submission
    const verificationForm = document.getElementById('verification-form');
    const idCardInput = document.getElementById('id-card-upload-input');
    const submitButton = document.getElementById('submit-verification-button');
    if (verificationForm && idCardInput && submitButton) {
        verificationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Check if the required ID card is uploaded
            if (!idCardInput.files || idCardInput.files.length === 0) {
                alert('โปรดอัปโหลดเอกสารยืนยันตัวตน (ID Card) ก่อนครับ');
                return;
            }
            // Show a loading state on the button
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Submitting...
            `;
            // Simulate a network request and then redirect
            setTimeout(() => {
                alert('ส่งเอกสารเพื่อตรวจสอบเรียบร้อยแล้ว! ระบบจะนำคุณไปยังหน้าโปรไฟล์ของเทรนเนอร์');
                window.location.href = 'trainer_profile.html';
            }, 1500); // Simulate 1.5 second delay
        });
    }
});
//# sourceMappingURL=../../data/trainer_verification.js.map