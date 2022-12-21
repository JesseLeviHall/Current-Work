const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { signUp, sandBox, login } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.get('/sandbox', protect, sandBox);
authRouter.post('/login', login);

module.exports = authRouter;
