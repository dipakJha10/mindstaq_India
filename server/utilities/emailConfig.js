const nodemailer = require("nodemailer");
const logger = require("./logger").logger;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deepakjha10dev@gmail.com",
    pass: "nadnuhbckuctfvpo",
  },
});

const sendEmail = (reqObj) => {
  try {
    var mailOptions = {
      from: "deepakjha10dev@gmail.com",
      subject: reqObj.subject,
      text: reqObj.text,
      to: reqObj.emailTo,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(`error in sendMail task ${error}`);
        throw error;
      } else {
        logger.info(`Email sent:  ${info.response}`);
      }
    });
  } catch (error) {
    logger.error(`error in sendMail task ${error}`);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
