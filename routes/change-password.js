const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middlewares/auth');
const { renderChangePassword, updatePassword } = require('../controllers/change-password');

router.get('/change-password', requireAuth, renderChangePassword);
router.post('/change-password', requireAuth, updatePassword);

module.exports = router;
