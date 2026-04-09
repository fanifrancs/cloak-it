const logoutUser = (req) => {
    return new Promise((resolve) => {
        req.session.destroy((error) => {
            if (error) {
                return resolve({
                    success: false,
                    error: 'Failed to logout user'
                });
            }

            return resolve({ success: true });
        });
    });
};

module.exports = logoutUser;
