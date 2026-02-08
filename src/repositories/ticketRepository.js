const { where, Op } = require("sequelize");
const { NotificationTicket } = require("../models/index.js")

class TicketRepository {
    async get(filter) {
        try {
            const now = new Date();
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const pendingTickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    NotificationTime: { [Op.between]: [twentyFourHoursAgo, now] }
                }
            });
            if (!pendingTickets) {
                throw "No Pending Tickets Found!"
            }
            return pendingTickets
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const res = await NotificationTicket.create(data);
            return res;
        } catch (error) {
            console.log("Error creating Notification ticket");
            throw error;
        }
    }

    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            ticket.status = data.status;
            ticket.save();
        } catch (error) {
            console.log("Error updating Notification ticket");
            throw error;
        }
    }
}

module.exports = TicketRepository;