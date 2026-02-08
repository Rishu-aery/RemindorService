const { mailtransporter } = require("../config/emailConfig.js");
const TicketRepository = require("../repositories/ticketRepository.js");

const ticket = new TicketRepository();

const sendMail = async (from, to, subject, mailBody) => {
    try {
        return await mailtransporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: mailBody
        }, (err, info) => {
            if (err) {
                console.log(`Error sending email to: ${to}`);
                throw error;
            }
        });
    } catch (error) {
        console.log("Email service failed!");
        throw error;
    }
}

const fetchPendingMails = async () => {
    try {
        const pendingTickets = ticket.get({ status: "PENDING" });
        return pendingTickets;
    } catch (error) {
        console.log("Error fetching pending mails");
        throw error;
    }
}

const createNotification = async (data) => {
    try {
        const res = ticket.create(data);
        return res;
    } catch (error) {
        throw error;
    }
}

const update = async (ticketId, data) => {
    try {
        const updatedTicket = ticket.update(ticketId, data);
        return updatedTicket;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    fetchPendingMails,
    createNotification,
    update
}