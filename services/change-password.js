const supabase = require('../db/supabase');
const { createServerAuthClient, toServiceErrorResult } = require('./helpers');

const changePassword = async ({ userId, username, currentPassword, newPassword }) => {
    try {
        const email = `${username}@cloakit.io`;

        // Re-authenticate with the current password before allowing the change.
        const authClient = createServerAuthClient();

        const { error: loginError } = await authClient.auth.signInWithPassword({
            email,
            password: currentPassword
        });

        if (loginError) {
            return { success: false, error: 'Current password is incorrect' };
        }

        const { data, error } = await supabase.auth.admin.updateUserById(userId, {
            password: newPassword
        });

        if (error) {
            return { success: false, error: error.message };
        }

        if (!data?.user?.id) {
            return { success: false, error: 'Failed to update password' };
        }

        return { success: true };
    } catch (err) {
        return toServiceErrorResult(err);
    }
};

module.exports = changePassword;
