const nodemailer = require('nodemailer');

const send_email = (to,subject,text) => {
  if (!to) return;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.receipt_email,
      pass: process.env.receipt_email_password
    }
  });

  const mail_options = {
    from: process.env.receipt_email,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mail_options, (err,info) => {
    if (err) {
      console.log(err);
    }
  })
}

module.exports = {send_email}