const nodemailer = require('nodemailer');
const verifyEmailTemplate = require('../templates/verifyEmailTemplate');

const SendMail = async (to, name, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })


        const mailOptions = {
            from: `"💖 Tutor App Team" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify your email with OTP",
            html: verifyEmailTemplate(name, otp),
        }

        await transporter.sendMail(mailOptions);

        console.log("✅ Email sent");
    } catch (error) {
        console.error("❌ Email not sent:", error);
    }
}


module.exports = SendMail;