"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const event_model_1 = require("../../models/event.model");
const ticket_model_1 = require("../../models/ticket.model");
const customError_utils_1 = require("../../utils/customError.utils");
const email_utills_1 = require("../../utils/email.utills");
const date_fns_1 = require("date-fns");
class TicketServiceImpl {
    async buyTicket(dto) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const event = await event_model_1.Event.findById(dto.eventId).session(session);
            if (!event) {
                throw new customError_utils_1.CustomError(404, "Event not found");
            }
            if (event.tickets.totalTickets - event.tickets.totalSold < dto.quantity) {
                throw new customError_utils_1.CustomError(400, "Not enough tickets available");
            }
            const tickets = [];
            for (let i = 0; i < dto.quantity; i++) {
                const ticketNumber = event.tickets.totalSold + 1 + i;
                const ticket = new ticket_model_1.Ticket({
                    email: dto.email,
                    event: dto.eventId,
                    status: "paid",
                    ticketNumber
                });
                await ticket.save({ session });
                tickets.push(ticket);
            }
            event.tickets.totalSold += Number(dto.quantity);
            await event.save({ session });
            await session.commitTransaction();
            const ticketData = tickets.map(ticket => ({
                ticketNumber: ticket.ticketNumber.toString(),
                eventTitle: event.eventName,
                imageUrl: event.eventImage,
                eventTimeStart: event.time.start,
                eventTimeEnd: event.time.start,
                ticketCode: ticket._id.toString(),
                location: `${event.location.place}, ${event.location.city}, ${event.location.state}`,
                eventDate: (0, date_fns_1.format)(event.eventDate, "EEEE d MMMM yyyy"),
                email: dto.email,
            }));
            for (const data of ticketData) {
                await this.sendEmail(data);
            }
        }
        catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            throw new customError_utils_1.CustomError(500, `Failed to buy ticket: ${error.message}`);
        }
        finally {
            session.endSession();
        }
    }
    async sendEmail(data) {
        const { ticketNumber, eventTitle, imageUrl, eventTimeStart, eventTimeEnd, ticketCode, location, eventDate, email } = data;
        const eventTime = `${eventTimeStart} - ${eventTimeEnd}`;
        const templatePath = "../template/eventTicket.handlebars";
        await (0, email_utills_1.sendEmail)(email, "Your Bitbandy Ticket", { ticketNumber, eventTitle, imageUrl, eventTime, ticketCode, location, eventDate }, templatePath);
    }
    async deleteAllTickets() {
        await ticket_model_1.Ticket.deleteMany({});
    }
}
exports.default = TicketServiceImpl;
