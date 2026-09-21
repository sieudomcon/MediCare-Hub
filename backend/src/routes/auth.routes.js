// routes/auth.routes.js
// Khai báo đường dẫn API: /api/auth/login, /api/auth/me, /api/auth/logout

const express = require('express');
const router = express.Router();

const { login, getMe, logout } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { loginLimiter } = require('../middlewares/rateLimit.middleware');

router.post('/login', loginLimiter, login);

router.get('/me', verifyToken, getMe);
router.post('/logout', verifyToken, logout);

module.exports = router;
