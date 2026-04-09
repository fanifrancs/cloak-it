const express = require('express');
const router = express.Router();

const { renderLogin, login } = require('../controllers/login');
const { redirectIfAuthenticated } = require('../middlewares/auth');

router
    .route('/login')
    .get(redirectIfAuthenticated, renderLogin)
    .post(login);

module.exports = router;
