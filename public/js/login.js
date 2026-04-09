const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const error = document.getElementById('error');

const usernameRegex = /^[a-zA-Z0-9]+$/;

usernameInput.addEventListener('input', function () {
    usernameInput.value = usernameInput.value.trim().toLowerCase();
});

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    setTimeout(clearError, 5000);
}

function clearError() {
    error.textContent = '';
    error.style.display = 'none';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        return showError('Username and password are required');
    }

    if (!usernameRegex.test(username)) {
        return showError('Username can only contain letters and numbers');
    }

    form.submit();
});
