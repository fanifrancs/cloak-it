const { getRecipientByUsername, createMessage } = require('../services/message');

const renderMessagePage = async (req, res) => {
    const { user } = req.params;

    const result = await getRecipientByUsername(user);

    if (!result.success) {
        req.flash('error', result.error);
        return res.redirect('/');
    }

    return res.render('message', {
        recipient: result.user
    });
};

const sendMessage = async (req, res) => {
    const { user } = req.params;
    const { content } = req.body;

    const fail = (message) => {
        req.flash('error', message);
        return res.redirect(`/${user}/message`);
    };

    if (!content || !content.trim()) {
        return fail('Message is required');
    }

    const result = await createMessage({
        username: user,
        content: content.trim()
    });

    if (!result.success) {
        return fail(result.error);
    }

    req.flash('success', 'Message sent successfully');
    return res.redirect(`/${user}/message`);
};

module.exports = {
    renderMessagePage,
    sendMessage
};
