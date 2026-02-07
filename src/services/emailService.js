const { mailtransporter } = require("../config/emailConfig.js");

const sendMail = async (from, to, subject, mailBody) => {
    try {
        mailtransporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: mailBody
        });
    } catch (error) {
        console.log("Email service failed!");
        throw error;
    }
}

module.exports = {
    sendMail
}