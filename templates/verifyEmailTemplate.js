const verifyEmailTemplate = (name, otp) => {
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Tutor App – Verify your email</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @media (max-width:600px){
        .container{width:100%!important}
        .px-24{padding-left:16px!important;padding-right:16px!important}
        .py-32{padding-top:20px!important;padding-bottom:20px!important}
        .h1{font-size:22px!important;line-height:28px!important}
        .lead{font-size:15px!important;line-height:22px!important}
        .otp{font-size:26px!important;letter-spacing:8px!important}
        .btn{display:block!important;width:100%!important}
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#fff7ed; font-family:Arial,Helvetica,sans-serif;">
    
    <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
      Your Tutor App verification code is ${otp}. It expires in 10 minutes.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff7ed;">
      <tr>
        <td align="center" style="padding: 32px 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px; background:#ffffff; border-radius:20px; box-shadow:0 10px 35px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td align="center" style="background:linear-gradient(90deg,#f97316,#ef4444); padding: 20px;">
                <img src="https://dummyimage.com/160x40/ffffff/f97316.png&text=Tutor+App" width="160" height="40" alt="Tutor App" style="display:block; border:0;">
                <div style="font:600 13px/1.4 Arial,Helvetica,sans-serif; color:#fff; margin-top:6px; letter-spacing:1px;">
                  EMAIL VERIFICATION
                </div>
              </td>
            </tr>

            <!-- GREETING -->
            <tr>
              <td class="px-24 py-32" style="padding: 32px 28px 10px 28px;">
                <h1 class="h1" style="margin:0; font:700 26px/1.3 Arial,Helvetica,sans-serif; color:#111827;">
                  Hello ${name} 👋
                </h1>
              </td>
            </tr>

            <!-- MESSAGE -->
            <tr>
              <td class="px-24" style="padding: 0 28px 14px 28px;">
                <p class="lead" style="margin:0; font:400 16px/1.6 Arial,Helvetica,sans-serif; color:#374151;">
                  Thanks for joining <strong>Tutor App</strong>! Use the code below to verify your email and unlock your learning journey 🚀
                </p>
              </td>
            </tr>

            <!-- OTP BOX -->
            <tr>
              <td align="center" style="padding: 20px 28px 0 28px;">
                <div style="display:inline-block; padding: 22px 28px; border-radius:16px; background:rgba(249,115,22,0.08); border:2px solid #f97316; backdrop-filter: blur(6px);">
                  <div class="otp" style="font:700 38px/1.2 'Courier New', Courier, monospace; color:#f97316; letter-spacing:14px; text-align:center; white-space:nowrap;">
                    ${otp}
                  </div>
                </div>
                <div style="font:400 12px/1.6 Arial,Helvetica,sans-serif; color:#9ca3af; margin-top:10px;">
                  (Tap & hold to copy on mobile)
                </div>
              </td>
            </tr>

            <!-- BUTTON -->
            <tr>
              <td align="center" style="padding: 28px 28px 0 28px;">
                <a href="#" style="display:inline-block; font:700 15px/1.2 Arial,Helvetica,sans-serif; color:#ffffff; text-decoration:none; background:linear-gradient(90deg,#f97316,#ef4444); padding: 15px 28px; border-radius:12px; box-shadow:0 6px 16px rgba(249,115,22,0.4); transition:all .3s;">
                  Open Tutor App
                </a>
              </td>
            </tr>

            <!-- NOTE -->
            <tr>
              <td class="px-24" style="padding: 20px 28px 0 28px;">
                <p style="margin:0; font:400 13px/1.6 Arial,Helvetica,sans-serif; color:#6b7280;">
                  ⏳ This code will expire in <strong>10 minutes</strong>. Keep it private for your security.
                </p>
              </td>
            </tr>

            <!-- DIVIDER -->
            <tr>
              <td style="padding: 24px 28px 0 28px;">
                <hr style="border:none; border-top:1px solid #fbbf24; margin:0;">
              </td>
            </tr>

            <!-- HELP -->
            <tr>
              <td class="px-24" style="padding: 18px 28px 0 28px;">
                <p style="margin:0 0 6px 0; font:700 13px/1.6 Arial,Helvetica,sans-serif; color:#111827;">
                  Need help?
                </p>
                <p style="margin:0; font:400 13px/1.6 Arial,Helvetica,sans-serif; color:#4b5563;">
                  Didn’t request this? Ignore this email. Questions? Contact us at
                  <a href="mailto:support@tutorapp.com" style="color:#f97316; text-decoration:none;">support@tutorapp.com</a>.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center" style="padding: 28px;">
                <p style="margin:0; font:600 12px/1.6 Arial,Helvetica,sans-serif; color:#111827;">
                  📘 Tutor App
                </p>
                <p style="margin:0; font:400 12px/1.6 Arial,Helvetica,sans-serif; color:#6b7280;">
                  © ${new Date().getFullYear()} Tutor App — Learn. Grow. Succeed.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

module.exports = verifyEmailTemplate;
