const supabase = require('../db/supabase');
const { getProfileByUsername, toServiceErrorResult } = require('./helpers');

const getRecipientByUsername = async (username) => {
    try {
        const { data, error } = await getProfileByUsername(username);

        if (error) {
            return { success: false, error: error.message };
        }

        if (!data) {
            return { success: false, error: 'User not found' };
        }

        return {
            success: true,
            user: data
        };
    } catch (err) {
        return toServiceErrorResult(err);
    }
};

const createMessage = async ({ username, content }) => {
    try {
        const recipient = await getRecipientByUsername(username);

        if (!recipient.success) {
            return recipient;
        }

        const { error } = await supabase
        .from('messages')
        .insert([{
            receiver_id: recipient.user.id,
            content,
            is_anonymous: true
        }]);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        return toServiceErrorResult(err);
    }
};

module.exports = {
    getRecipientByUsername,
    createMessage
};
