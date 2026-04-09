const { createClient } = require('@supabase/supabase-js');
const supabase = require('../db/supabase');

const createServerAuthClient = () => {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false
            }
        }
    );
};

const getProfileByUsername = async (username, columns = 'id, username') => {
    return supabase
    .from('profiles')
    .select(columns)
    .eq('username', username)
    .maybeSingle();
};

const toServiceErrorResult = (error) => {
    return {
        success: false,
        error: error?.message || 'Something went wrong'
    };
};

module.exports = {
    createServerAuthClient,
    getProfileByUsername,
    toServiceErrorResult
};
