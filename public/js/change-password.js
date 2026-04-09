const form = document.querySelector('form[action="/change-password"]');
const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const error = document.getElementById('error');

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    setTimeout(clearError, 5000);
}

function clearError() {
    error.textContent = '';
    error.style.display = 'none';
}

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return showError('All password fields are required');
        }

        if (newPassword.length < 6) {
            return showError('New password must be at least 6 characters');
        }

        if (newPassword !== confirmPassword) {
            return showError('New passwords do not match');
        }

        if (currentPassword === newPassword) {
            return showError('New password must be different from current password');
        }

        form.submit();
    });
}
