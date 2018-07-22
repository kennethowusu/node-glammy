
'use strict';
const nodemailer = require('nodemailer');
//require mail Template
var template = require('./mailTemplate');

//require dotenv
require('dotenv').config();





// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NAMECHEAPEMAILADDRESS, // generated ethereal user
        pass: process.env.NAMECHEAPPASSWORD // generated ethereal password
    }
});



// send mail with defined transport object
module.exports.sendMail = function(mailOptions){
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}



//Send Reset Code
module.exports.sendResetCode = function(resetCode){
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Glammycare " <admin@glammycare.com>', // sender address
          to: 'consultkenneth@gmail.com', // list of receivers
          subject:'GlammyCare Reset Password', // Subject line
          text: 'Hello world?', // plain text body
          html: template.generateResetCodeTemplate(resetCode) // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });

}
