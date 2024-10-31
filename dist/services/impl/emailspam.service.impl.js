"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailspam_model_1 = require("../../models/emailspam.model");
const customError_utils_1 = require("../../utils/customError.utils");
const event_model_1 = require("../../models/event.model");
const date_fns_1 = require("date-fns");
const ticket_model_1 = require("../../models/ticket.model");
const ticket_service_impl_1 = __importDefault(require("./ticket.service.impl"));
class EmailSpamServiceImpl {
    constructor() {
        this.ticketService = new ticket_service_impl_1.default();
    }
    async createEmailSpam(dto) {
        try {
            // Find the event by ID
            const event = await event_model_1.Event.findById(dto.eventId);
            if (!event) {
                throw new customError_utils_1.CustomError(404, "Event not found");
            }
            // Check if there are enough tickets
            if (event.tickets.totalTickets - event.tickets.totalSold < 1) {
                throw new customError_utils_1.CustomError(400, "No tickets available");
            }
            // Check if email already exists in the spam list for this event
            const existingEmailSpam = await emailspam_model_1.EmailSpam.findOne({ email: dto.email, event: dto.eventId });
            if (existingEmailSpam) {
                throw new customError_utils_1.CustomError(400, "A free ticket has already been given to this email");
            }
            const emailSpam = new emailspam_model_1.EmailSpam({
                event: event._id,
                email: dto.email,
                name: dto.name,
            });
            await emailSpam.save();
            const ticketNumber = event.tickets.totalSold + 1;
            const ticket = new ticket_model_1.Ticket({
                email: dto.email,
                event: dto.eventId,
                status: "paid",
                ticketNumber
            });
            await ticket.save();
            // Deduct the ticket from total available tickets
            event.tickets.totalSold += 1;
            await event.save();
            // Prepare email data
            const emailData = {
                ticketNumber: ticket.ticketNumber.toString(),
                email: dto.email,
                eventTitle: event.eventName,
                imageUrl: event.eventImage,
                eventTimeStart: event.time.start,
                eventTimeEnd: event.time.end,
                location: `${event.location.place}, ${event.location.city}, ${event.location.state}`,
                eventDate: (0, date_fns_1.format)(event.eventDate, "EEEE d MMMM yyyy"),
                ticketCode: emailSpam._id.toString(),
            };
            await this.ticketService.sendEmail(emailData);
        }
        catch (error) {
            throw new customError_utils_1.CustomError(500, `${error.message}`);
        }
    }
    async updateEmailSpam(id, dto) {
        await emailspam_model_1.EmailSpam.findByIdAndUpdate(id, dto);
    }
    async deleteEmailSpam(id) {
        await emailspam_model_1.EmailSpam.findByIdAndDelete(id);
    }
    async getEmailSpamById(id) {
        return await emailspam_model_1.EmailSpam.findById(id);
    }
    async getAllEmailSpam(page, pageSize) {
        const skip = (page - 1) * pageSize;
        return await emailspam_model_1.EmailSpam.find().skip(skip).limit(pageSize);
    }
}
exports.default = EmailSpamServiceImpl;
