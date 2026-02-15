const { mailtransporter } = require("../config/emailConfig.js");
const { EMAIL } = require("../config/serverConfig.js");
const TicketRepository = require("../repositories/ticketRepository.js");

const ticket = new TicketRepository();

const sendMail = async (from, to, subject, mailBody) => {
    try {
        const res = await mailtransporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: mailBody
        });
        return res;
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

const subscribeEvents = async (payload) => {
    try {
        let service = payload.service;
        let data = payload.data;
        switch (service) {
            case "CREATE_TICKET":
                await createNotification(data);
                break;
            case "SEND_EMAIL":
                const [recipientEmail, subject, content] = data;
                await sendMail(EMAIL, recipientEmail, subject, content);
            default:
                console.log("No Valid Event recieved!");
                break;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    fetchPendingMails,
    createNotification,
    update,
    subscribeEvents
}