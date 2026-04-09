const changePassword = require('../services/change-password');

const renderChangePassword = (req, res) => {
    return res.render('change-password');
};

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const fail = (message) => {
        req.flash('error', message);
        return res.redirect('/change-password');
    };

    if (!currentPassword || !newPassword || !confirmPassword) {
        return fail('All password fields are required');
    }

    if (newPassword.length < 6) {
        return fail('New password must be at least 6 characters');
    }

    if (newPassword !== confirmPassword) {
        return fail('New passwords do not match');
    }

    if (currentPassword === newPassword) {
        return fail('New password must be different from current password');
    }

    const result = await changePassword({
        userId: req.session.user.id,
        username: req.session.user.username,
        currentPassword,
        newPassword
    });

    if (!result.success) {
        return fail(result.error);
    }

    req.flash('success', 'Password updated successfully');
    return res.redirect('/change-password');
};

module.exports = {
    renderChangePassword,
    updatePassword
};
