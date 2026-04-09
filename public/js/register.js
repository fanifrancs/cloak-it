const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const error = document.getElementById('error');

const usernameRegex = /^[a-zA-Z0-9]+$/;

usernameInput.addEventListener('input', function () {
    usernameInput.value = usernameInput.value.trim().toLowerCase();
});

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    // clears error message after 5 seconds
    setTimeout(clearError, 5000);
}

function clearError() {
    error.textContent = '';
    error.style.display = 'none';
}

form.addEventListener('submit', function (e) {
    e.preventDefault(); // stop form from submitting

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username || !password) {
        return showError('Username and password are required');
    }

    if (!usernameRegex.test(username)) {
        return showError('Username can only contain letters and numbers');
    }

    if (username.length < 3 || username.length > 20) {
        return showError('Username must be at least 3 characters and at most 20 characters');
    }

    if (password.length < 6) {
        return showError('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
        return showError('Passwords do not match');
    }

    // if everything passes, submit the form
    form.submit();
});
