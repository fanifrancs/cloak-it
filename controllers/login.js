// import service for user login
const loginUser = require('../services/login');
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

const renderLogin = (req, res) => {
    return res.render('login');
};

const login = async (req, res) => {
    const username = req.body.username?.trim();
    const { password } = req.body;

    const fail = (message, username) => {
        req.flash('error', message);
        req.flash('username', username);
        return res.redirect('/login');
    };

    if (!username || !password) {
        return fail('Username and password are required', username);
    }

    if (!USERNAME_REGEX.test(username)) {
        return fail('Username can only contain letters and numbers', username);
    }

    // call service layer (actual logic lives here)
    const result = await loginUser({ username, password });

    if (!result.success) {
        return fail(result.error, username);
    }

    // if login is successful, store user in session and redirect
    req.session.user = {
        id: result.user.id,
        username: result.user.username
    };

    return res.redirect('/dashboard');
};

module.exports = {
    renderLogin,
    login
};
