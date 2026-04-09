const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middlewares/auth');
const { logout } = require('../controllers/logout');

router.post('/logout', requireAuth, logout);

module.exports = router;
