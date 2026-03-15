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
    setupImagePreview('id-card-upload-input', 'id-card-preview', 'id-card-icon', 'id-card-remove-btn');
    setupImagePreview('certificate-upload-input', 'certificate-preview', 'certificate-icon', 'certificate-remove-btn');
});
//# sourceMappingURL=../../data/trainer_verification.js.map