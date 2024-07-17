import mongoose from "mongoose";
import { BuyTicketDto } from "../../dto/ticket.dto";
import { Event } from "../../models/event.model";
import { ITicket, Ticket } from "../../models/ticket.model";
import { CustomError } from "../../utils/customError.utils";
import { TicketService } from "../ticket.service";
import { SendEmailDto } from "../../dto/email.dto";
import { sendEmail } from "../../utils/email.utills";
import { format } from 'date-fns';

class TicketServiceImpl implements TicketService {

    async buyTicket(dto: BuyTicketDto): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const event = await Event.findById(dto.eventId).session(session);
            if (!event) {
                throw new CustomError(404, "Event not found");
            }

            if (event.tickets.totalTickets - event.tickets.totalSold < dto.quantity) {
                throw new CustomError(400, "Not enough tickets available");
            }

            const tickets: ITicket[] = [];
            for (let i = 0; i < dto.quantity; i++) {
                const ticketNumber = event.tickets.totalSold + 1 + i;
                const ticket = new Ticket({
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

            const ticketData: SendEmailDto[] = tickets.map(ticket => ({
                ticketNumber: ticket.ticketNumber.toString(),
                eventTitle: event.eventName,
                imageUrl: event.eventImage,
                eventTimeStart: event.time.start,
                eventTimeEnd: event.time.start,
                ticketCode: ticket._id.toString(),
                location: `${event.location.place}, ${event.location.city}, ${event.location.state}`,
                eventDate: format(event.eventDate, "EEEE d MMMM yyyy"),
                email: dto.email,
            }));

            for (const data of ticketData) {
                await this.sendEmail(data);
            }
        } catch (error: any) {
            throw new CustomError(500, `Failed to buy ticket: ${error.message}`);
        } finally {
            await session.abortTransaction();
            session.endSession();
        }
    }

    async sendEmail(data: SendEmailDto): Promise<void> {
        const { ticketNumber, eventTitle, imageUrl, eventTimeStart, eventTimeEnd, ticketCode, location, eventDate, email } = data;
        const eventTime = `${eventTimeStart} - ${eventTimeEnd}`
        const templatePath = "../template/eventTicket.handlebars";

        await sendEmail(email, "Your Bitbandy Ticket", { ticketNumber, eventTitle, imageUrl, eventTime, ticketCode, location, eventDate }, templatePath);
    }
}

export default TicketServiceImpl;