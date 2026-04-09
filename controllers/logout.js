const logoutUser = require('../services/logout');

const logout = async (req, res) => {
    const result = await logoutUser(req);

    if (!result.success) {
        req.flash('error', result.error);
        return res.redirect('/dashboard');
    }

    res.clearCookie('connect.sid');
    return res.redirect('/login');
};

module.exports = { logout };
