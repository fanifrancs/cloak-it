const express = require('express');
const router = express.Router();

const testConnection = require('../controllers/test');

router.get('/test-db', testConnection);

module.exports = router;
