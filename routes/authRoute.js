const express = require('express');
const { register, login, verifyEmail, resetPassword, forgotPassword, resendEmail, editUser, deleteUser } = require('../controllers/authController');
const authorizeRoles = require('../middlewares/authorizeRoles');
const auth_middleware = require('../middlewares/verify_token');
const router = express.Router();


router.route('/register').post(register)
router.route("/login").post(login);
router.route("/verify-otp").post(verifyEmail);
router.route("/resend-email").post(resendEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.patch('/edit-user',auth_middleware, authorizeRoles('Admin'), editUser)
router.delete('/delete-user',auth_middleware, authorizeRoles('Admin'), deleteUser)



module.exports = router;