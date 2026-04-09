const supabase = require('../db/supabase');
const { getProfileByUsername, toServiceErrorResult } = require('./helpers');

const registerUser = async ({ username, password }) => {
    try {
        // check if username exists
        const { data: existing, error: existingError } = await getProfileByUsername(username, 'id');

        if (existingError) {
            return { success: false, error: existingError.message };
        }

        if (existing) {
            return { success: false, error: 'Username already taken' };
        }

        const email = `${username}@cloakit.io`;

        // create user in auth
        const { data, error: userError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (userError) {
            return { success: false, error: userError.message };
        }

        if (!data?.user?.id) {
            return { success: false, error: 'Failed to create account' };
        }

        const userId = data.user.id;

        // insert into profiles
        const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, username }]);

        if (profileError) {
            // rollback auth user
            await supabase.auth.admin.deleteUser(userId).catch(() => {});
            return { success: false, error: profileError.message };
        }

        return {
            success: true,
            user: { id: userId, username },
            session: null
        };

    } catch (err) {
        return toServiceErrorResult(err);
    }
};

module.exports = registerUser;
