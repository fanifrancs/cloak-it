const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    next();
};

const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    next();
};

module.exports = { requireAuth, redirectIfAuthenticated };
