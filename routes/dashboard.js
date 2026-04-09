const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middlewares/auth');
const { renderDashboard, removeDashboardMessage } = require('../controllers/dashboard');

router.get('/dashboard', requireAuth, renderDashboard);
router.post('/dashboard/message/:id/delete', requireAuth, removeDashboardMessage);

module.exports = router;
