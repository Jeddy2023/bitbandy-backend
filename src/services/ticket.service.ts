import { BuyTicketDto } from "../dto/ticket.dto";

export interface TicketService {
    buyTicket(dto: BuyTicketDto): Promise<void>;
}