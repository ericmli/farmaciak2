const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = async ( email, subject, data ) => {
  try {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSOWRDEMAIL
        },
      });

    let info = await transporter.sendMail({
      from:  process.env.EMAIL,
      to: email, // list of receivers
      subject: subject, // Subject line
      html: data, // html body
    });

    return info

  } catch (error) {
    return console.log(error)
}
}