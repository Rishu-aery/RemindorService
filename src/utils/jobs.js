const cron = require('node-cron');
const { fetchPendingMails, update } = require('../services/emailService');
// const { EMAIL } = require("../config/serverConfig.js");
const { mailtransporter } = require('../config/emailConfig.js');


const setupJobs = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const response = await fetchPendingMails();
            response.forEach(async (pendingTicket) => {
                const { recipientEmail, subject, content, id } = pendingTicket.dataValues;
                mailtransporter.sendMail({
                    to: recipientEmail,
                    subject: subject,
                    text: content
                }, async (err, info) => {
                    if (err) {
                        console.log(`Error sending email to: ${to}`);
                        throw error;
                    }
                    await update(id, {status: "SUCCESS"});
                });
            });

        } catch (error) {
            console.log("Error job schedular!");
            throw error;
        }
    });
}

module.exports = {
    setupJobs
}