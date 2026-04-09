const express = require('express');
const router = express.Router();

const { register, renderRegister } = require('../controllers/register');
const { redirectIfAuthenticated } = require('../middlewares/auth');

router
    .route('/register')
    .get(redirectIfAuthenticated, renderRegister)
    .post(register);

module.exports = router;
