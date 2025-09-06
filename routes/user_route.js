const express = require('express');
const { register, login, verifyEmail } = require('../services/user_service');
const router = express.Router();


router.route('/register').post(register)
router.route("/login").post(login);
router.route("/verify-otp").post(verifyEmail);







module.exports = router;