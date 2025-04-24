const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, 
  port: process.env.MAIL_PORT, 
  secure: process.env.MAIL_SMTPSECURE === 'ssl', // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_PASSWORD,
  },
});

// async function sendMail(to, subject, html) {
//   const mailOptions = {
//     from: process.env.MAIL_FROM, 
//     to: to, 
//     subject: subject, 
//     html :html, 
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// const postDataExample = {
//   fromName: "Your App",
//   name: "User",
//   user_id: "123456"
// };

// sendMail("patkiharsh2@gmail.com", "Test Email", postDataExample );

//  module.exports = sendMail;

async function sendMail(to, subject, html) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
  module.exports=sendMail;


//  `<!DOCTYPE html>

//     <html>

//     <head>

//         <meta name="viewport" content="width=device-width, initial-scale=1">

//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

//         <title>Welcome to ${process.env.fromName}</title>

//     </head>

//     <body style="margin: 0; padding: 0; background-color:#000000; font-size:13px; color:#444; font-family:Arial, Helvetica, sans-serif; padding-top:70px; padding-bottom:70px;">

//         <table cellspacing="0" cellpadding="0" align="center" width="768" class="outer-tbl" style="margin:0 auto;">

//             <tr>

//                 <td class="pad-l-r-b" style="background-color:#FFFFFF; padding:0 70px 40px;">

//                     <table cellpadding="0" cellspacing="0" class="full-wid">

//                     </table>

//                     <table cellpadding="0" cellspacing="0" style="width:100%; background-color:#FFFFFF; border-radius:4px;box-shadow:0 0 20px #ccc;margin-top:40px">

//                         <tr>

//                             <td>

//                                 <table border="0" style="margin:0; width:100%" cellpadding="0" cellspacing="0">

//                                     <tr>

//                                         <td class="logo" style="padding:40px 0 30px 0; background-color:#1ddec4; text-align:center; border-bottom:1px solid #E1E1E1">

//                                             <img src="${process.env.APP_LOGO}" alt="" width="15%" height="18%" style="background-color: white; padding:5px">

//                                             <h1 style="color:white;">Forgot Your Password</h1>

//                                         </td>

//                                     </tr>

//                                     <tr><td></td></tr>

//                                     <tr>

//                                         <td class="content" style="padding:40px 40px;">

//                                             <p style="font-family:Arial, Helvetica, sans-serif; font-size:15px; color:#333333; margin-top:0">

//                                                 Hello ${postDataExample.name}

//                                             </p>

//                                     <p style="font-family:Arial, Helvetica, sans-serif; font-size:15px; color:#333333; margin-top:0">

//                                     You have requested to reset your password. Below is the Reset Password button you can click to change your password.

//                                 </p>

//                                             <p style="text-align: center;">

//                                         <a href='${process.env.Forgot_Password}${process.env.user_id}' target="_blank" style="display: inline-block; background-color: #1ddec4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">

//                                             Reset Password

//                                         </a>

//                                     </p>

//                                             <p style="font-family:Arial, Helvetica, sans-serif; font-size:15px; color:#333333; margin-top:0">

//                                                 Regards,

//                                             </p>

//                                             <p style="font-family:Arial, Helvetica, sans-serif; font-size:15px; color:#333333; margin-top:0">

//                                             ${process.env.APP_NAME}

//                                             </p>

//                                         </td>

//                                     </tr>

//                                     <tr>

//                                         <td style="background:#1ddec4; padding-bottom:60px;">

//                                             <table style="width:100%" border="0" cellspacing="0" cellpadding="0" class="full-wid" align="center">

//                                                 <tr>

//                                                     <td>

//                                                         <div style="margin:0 auto; text-align:center; padding:0 100px" class="foot-items">

//                                                             <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#fbfbfb; margin-top:40px; line-height:20px;">

//                                                                 &#169; ${process.env.APP_NAME} | All right Reserved
                                                                

//                                                             </p>


//                                                             <p style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#fbfbfb; line-height:20px; margin-bottom:40px;">

//                                                                 The content of this message is confidential. If you have received it by mistake, please inform us by an email reply and then delete the message. It is forbidden to copy, forward, or in any way reveal the contents of this message to anyone.

//                                                             </p>

//                                                         </div>

//                                                     </td>

//                                                 </tr>

//                                             </table>

//                                         </td>

//                                     </tr>

//                                 </table>

//                             </td>

//                         </tr>

//                     </table>

//                 </td>

//             </tr>

//         </table>

//     </body>

//     </html>   `