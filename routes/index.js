const express = require('express');
const router = express.Router();

const index = require('../controllers/index');
const { redirectIfAuthenticated } = require('../middlewares/auth');

router.get('/', redirectIfAuthenticated, index);

module.exports = router;
