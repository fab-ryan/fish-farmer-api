/* eslint-disable import/no-extraneous-dependencies */
import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import { config } from '../config';
import { logger } from './logger';

export const sendEmail = async (mailOptions: nodemailer.SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.MAIL.MAIL_USERNAME,
      pass: config.MAIL.MAIL_PASSWORD,
    },
  });
  const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: '.handlebars',
      partialsDir: path.resolve('./src/templates/'),
      layoutsDir: path.resolve('./src/templates/'),
      defaultLayout: '',
    },
    viewPath: path.resolve('./src/templates/'),
    extName: '.handlebars',
  };
  transporter.use('compile', hbs(handlebarOptions));
  const options = {
    from: `"${config.MAIL.MAIL_FROM_NAME}" <${config.MAIL.MAIL_FROM_EMAIL}>`,
    ...mailOptions,
  };
  const info = await transporter.sendMail(options);
  logger.info(`Message sent: ${info.messageId} `);
};
