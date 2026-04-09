const supabase = require('../db/supabase');
const { getProfileByUsername, toServiceErrorResult } = require('./helpers');

const getDashboardMessages = async (username) => {
    try {
        const { data: profile, error: profileError } = await getProfileByUsername(username);

        if (profileError) {
            return { success: false, error: profileError.message };
        }

        if (!profile) {
            return { success: false, error: 'User not found' };
        }

        const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('id, content, created_at')
        .eq('receiver_id', profile.id)
        .order('created_at', { ascending: false });

        if (messagesError) {
            return { success: false, error: messagesError.message };
        }

        return {
            success: true,
            messages: messages || []
        };
    } catch (err) {
        return toServiceErrorResult(err);
    }
};

const deleteDashboardMessage = async ({ messageId, userId }) => {
    try {
        const { data: existingMessage, error: fetchError } = await supabase
        .from('messages')
        .select('id, receiver_id')
        .eq('id', messageId)
        .maybeSingle();

        if (fetchError) {
            return { success: false, error: fetchError.message };
        }

        if (!existingMessage?.id) {
            return { success: false, error: 'Message not found' };
        }

        if (existingMessage.receiver_id !== userId) {
            return { success: false, error: 'You cannot delete this message' };
        }

        const { error: deleteError } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

        if (deleteError) {
            return { success: false, error: deleteError.message };
        }

        return { success: true };
    } catch (err) {
        return toServiceErrorResult(err);
    }
};

module.exports = {
    getDashboardMessages,
    deleteDashboardMessage
};
