const nodemailer = require("nodemailer");
const { GMAIL_APP_PASSWORD, EMAIL } = require("./serverConfig");

const mailtransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

module.exports = {
    mailtransporter
}