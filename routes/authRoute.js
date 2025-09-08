const express = require('express');
const { register, login, verifyEmail } = require('../controllers/authController');
const router = express.Router();


router.route('/register').post(register)
router.route("/login").post(login);
router.route("/verify-otp").post(verifyEmail);



module.exports = router;