const express = require('express');
const router = express.Router();

const { renderMessagePage, sendMessage } = require('../controllers/message');

router
    .route('/:user/message')
    .get(renderMessagePage)
    .post(sendMessage);

module.exports = router;
