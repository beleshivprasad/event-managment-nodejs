const nodemailer = require("nodemailer");

const { capitalizeText } = require("./stringHelper");
const { PUBLISH_IMAGE_TO_BILLBOARD } = require("../../../config/constants");

// nodemailer options
const transportOptions = {
  host: process.env.REACT_APP_MAIL_SERVICE_HOST,
  port: process.env.REACT_APP_MAIL_SERVICE_PORT,
  secure: +process.env.REACT_APP_MAIL_SERVICE_PORT === 465, // true for 465, false for other ports
  auth: {
    user: process.env.REACT_APP_MAIL_SERVICE_USER,
    pass: process.env.REACT_APP_MAIL_SERVICE_PASS
  },
  secureConnection: true,
  tls: {
    ciphers: process.env.REACT_APP_MAIL_SERVICE_TLS_CIPHERS
  }
};

// create nodemailer transport instance using given options
const transport = nodemailer.createTransport(transportOptions);

// return email html template as per name
const getMailOptionsByTemplateName = (templateName, emailInfo) => {
  switch (templateName) {
    case PUBLISH_IMAGE_TO_BILLBOARD:
      return {
        from: process.env.REACT_APP_MAIL_SERVICE_SENDER_ADDRESS,
        to: "shivprasad.bele@joshsoftware.com" || emailInfo.email,
        subject: "You Are Starring On Time Square Billboard",
        html: `
        <p>Hello ${capitalizeText(emailInfo.name) || "there"},</p>
        <p>Your selfie has been submitted successfully.</p>
        <p>Thanks for participating!</p>
        `
      };
    default:
      return {};
  }
};

// send email
const sendEmail = async (templateName, emailInfo) => {
  const mailOptions = getMailOptionsByTemplateName(templateName, emailInfo);

  return await transport.sendMail(mailOptions);
};

module.exports = { sendEmail };
