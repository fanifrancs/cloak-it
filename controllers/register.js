// import service for user registration
const registerUser = require('../services/register');
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

const renderRegister = (req, res) => {
    // render the registration page
    return res.render('register');
};

const register = async (req, res) => {
    const username = req.body.username?.trim();
    const { password, confirmPassword } = req.body;

    const fail = (message, username) => {
        req.flash('error', message);
        req.flash('username', username);
        return res.redirect('/register');
    };

    if (!username || !password) {
        return fail('Username and password are required', username);
    }

    if (!USERNAME_REGEX.test(username)) {
        return fail('Username can only contain letters and numbers', username);
    }

    if (username.length < 3 || username.length > 20) {
        return fail('Username must be at least 3 characters and at most 20 characters', username);
    }

    if (password.length < 6) {
        return fail('Password must be at least 6 characters', username);
    }

    if (password !== confirmPassword) {
        return fail('Passwords do not match', username);
    }

    // call service layer (actual logic lives here)
    const result = await registerUser({ username, password });

    if (!result.success) {
        return fail(result.error, username);
    }

    // registration successful, flash the success message and redirect to login
    req.flash('success', 'Account created successfully. Now you can login.');
    return res.redirect('/login');
};

module.exports = {
    renderRegister,
    register
};
