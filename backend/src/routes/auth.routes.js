// routes/auth.routes.js
// Khai báo đường dẫn API: /api/auth/login, /api/auth/register ...

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
