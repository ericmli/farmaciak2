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
      if (!data) {
        data = `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f9;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #4CAF50;
                }
                p {
                  font-size: 16px;
                  color: #333;
                }
                .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Conta Criada com Sucesso!</h1>
                <p>Olá, <strong>${email}</strong>,</p>
                <p>Parabéns! Sua conta foi criada com sucesso. Você já pode começar a usar nossos serviços.</p>
                <p>Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco.</p>
                <div class="footer">
                  <p>Obrigado por se cadastrar!</p>
                </div>
              </div>
            </body>
          </html>
        `;
      }
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