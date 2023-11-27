'use strict';

// core modules
const nodemailer = require('nodemailer');
const EmailHistory = require('../models/EmailHistory');

module.exports = {

  sendMail:  (options) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, 
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASSWORD, 
      },
    });
  
    const mailOptions = {
      from: 'sathiz70@gmail.com',
      to: options.email,
      subject: 'Testing',
      html: 'Welcome',
    };
  
    return new Promise((resolve) => {
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error('Error sending email:', err.message);
          resolve(false);
        } else {
          console.log('Email sent successfully');
          EmailHistory.updateOne({ email: options.email }, { $set: { status: true } })
          .then(() => resolve(true))
          .catch((updateError) => {
            console.error('Error updating email history:', updateError.message);
            resolve(false);
          });
          resolve(true);
        }
      });
    });
  },

 
};
