const { getDashboardMessages, deleteDashboardMessage } = require('../services/dashboard');

const renderDashboard = async (req, res) => {
  const result = await getDashboardMessages(req.session.user.username);

  if (!result.success) {
    req.flash('error', result.error);
    return res.render('dashboard', { messages: [] });
  }

  return res.render('dashboard', { messages: result.messages });
};

const removeDashboardMessage = async (req, res) => {
  const { id } = req.params;

  const result = await deleteDashboardMessage({
    messageId: id,
    userId: req.session.user.id
  });

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }

  return res.json({ success: true });
};

module.exports = {
  renderDashboard,
  removeDashboardMessage
};
