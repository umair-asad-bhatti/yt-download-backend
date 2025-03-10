const express = require('express');
const AUTH_CONTROLLER = require('../controller/auth');
const { validateAccessToken } = require('../middleware');
const router = express.Router();
//signup route
router.post('/signup', AUTH_CONTROLLER.signup);
router.post('/login', AUTH_CONTROLLER.login);
router.post('/refresh-token', AUTH_CONTROLLER.refreshToken);
//TODO implement the logut api
module.exports = router;
