const { createServerAuthClient, getProfileByUsername, toServiceErrorResult } = require('./helpers');

const loginUser = async ({ username, password }) => {
    try {
        const { data: profile, error: profileError } = await getProfileByUsername(username);

        if (profileError) {
            return { success: false, error: profileError.message };
        }

        if (!profile) {
            return { success: false, error: 'Invalid username or password' };
        }

        const email = `${profile.username}@cloakit.io`;

        // Use a fresh client for password verification so the shared server
        // client does not get its auth state replaced by a user session.
        const authClient = createServerAuthClient();

        const { data, error } = await authClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return { success: false, error: 'Invalid username or password' };
        }

        if (!data?.user?.id) {
            return { success: false, error: 'Failed to login user' };
        }

        // successful login
        return {
            success: true,
            user: {
                id: profile.id,
                username: profile.username
            },
            session: data.session || null
        };
    } catch (err) {
        return toServiceErrorResult(err);
    }
};

module.exports = loginUser;
