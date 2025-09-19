const express = require('express');
const { register, login, verifyEmail, resetPassword, forgotPassword, resendEmail } = require('../controllers/authController');
const router = express.Router();


router.route('/register').post(register)
router.route("/login").post(login);
router.route("/verify-otp").post(verifyEmail);
router.route("/resend-email").post(resendEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);



module.exports = router;