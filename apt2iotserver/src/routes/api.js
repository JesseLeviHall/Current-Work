const express = require('express');

const authRouter = require('./auth.route');
const profileRouter = require('./profile.route');

const api = express.Router();

api.use('/', authRouter);
api.use('/', profileRouter);

module.exports = api;
