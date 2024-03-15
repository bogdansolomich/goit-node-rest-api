require("dotenv").config();
const nodemailer = require("nodemailer");

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transporter.sendMail(email);
};

module.exports = sendEmail;
