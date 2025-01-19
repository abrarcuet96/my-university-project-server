import nodemailer from 'nodemailer';
import config from '../config';
export const senedEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for production, false for development
    auth: {
      user: 'abrarhaider1357@gmail.com',
      pass: 'xfgr bxqp rznf wxjn',
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: 'abrarhaider1357@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
