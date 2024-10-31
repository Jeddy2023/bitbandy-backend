import { IEmailSpam } from "../../models/emailspam.model";
import { EmailSpamService } from "../emailspam.service";
import { CreateEmailSpamDto, UpdateEmailSpamDto } from "../../dto/createEmailSpam.dto";
import { EmailSpam } from "../../models/emailspam.model";
import { CustomError } from "../../utils/customError.utils";
import { Event } from "../../models/event.model";
import { SendEmailDto } from "../../dto/email.dto";
import { format } from 'date-fns';
import { Ticket } from "../../models/ticket.model";
import TicketServiceImpl from "./ticket.service.impl";

class EmailSpamServiceImpl implements EmailSpamService {
    private ticketService = new TicketServiceImpl();

    async createEmailSpam(dto: CreateEmailSpamDto): Promise<void> {
        try {
            // Find the event by ID
            const event = await Event.findById(dto.eventId);
            if (!event) {
                throw new CustomError(404, "Event not found");
            }

            // Check if there are enough tickets
            if (event.tickets.totalTickets - event.tickets.totalSold < 1) {
                throw new CustomError(400, "No tickets available");
            }

            // Check if email already exists in the spam list for this event
            const existingEmailSpam = await EmailSpam.findOne({ email: dto.email, event: dto.eventId });
            if (existingEmailSpam) {
                throw new CustomError(400, "A free ticket has already been given to this email");
            }

            const emailSpam = new EmailSpam({
                event: event._id,
                email: dto.email,
                name: dto.name,
            });
            await emailSpam.save();

            const ticketNumber = event.tickets.totalSold + 1
            const ticket = new Ticket({
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
            const emailData: SendEmailDto = {
                ticketNumber: ticket.ticketNumber.toString(),
                email: dto.email,
                eventTitle: event.eventName,
                imageUrl: event.eventImage,
                eventTimeStart: event.time.start,
                eventTimeEnd: event.time.end,
                location: `${event.location.place}, ${event.location.city}, ${event.location.state}`,
                eventDate: format(event.eventDate, "EEEE d MMMM yyyy"),
                ticketCode: emailSpam._id.toString(),
            };

            await this.ticketService.sendEmail(emailData);
        } catch (error: any) {
            throw new CustomError(500, `${error.message}`);
        }
    }

    async updateEmailSpam(id: string, dto: UpdateEmailSpamDto): Promise<void> {
        await EmailSpam.findByIdAndUpdate(id, dto);
    }

    async deleteEmailSpam(id: string): Promise<void> {
        await EmailSpam.findByIdAndDelete(id);
    }

    async getEmailSpamById(id: string): Promise<IEmailSpam | null> {
        return await EmailSpam.findById(id);
    }

    async getAllEmailSpam(page: number, pageSize: number): Promise<IEmailSpam[]> {
        const skip = (page - 1) * pageSize;
        return await EmailSpam.find().skip(skip).limit(pageSize);
    }
}

export default EmailSpamServiceImpl;
