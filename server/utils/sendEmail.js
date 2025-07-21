import nodeMailer from "nodemailer";
import logger from "./logger.js";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(options);

    logger.info(`📧 Email sent to ${email} | Subject: "${subject}"`, {
      email,
      subject,
      messageSnippet: message.slice(0, 50),
      messageId: info.messageId,
    });
  } catch (err) {
    logger.error(` Failed to send email to ${email}`, {
      error: err.message,
      stack: err.stack,
      email,
      subject,
    });
    throw err;
  }
};
