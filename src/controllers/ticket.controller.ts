import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";
import { TicketService } from "../services/ticket.service";
import TicketServiceImpl from "../services/impl/ticket.service.impl";
import { BuyTicketDto } from "../dto/ticket.dto";
import { validator } from "../utils/validator.utils";

const ticketService: TicketService = new TicketServiceImpl();

export const buyTicketController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const buyTicketDto = new BuyTicketDto(req.body);

    const errors = validator(BuyTicketDto, buyTicketDto);
    if (errors) return res.status(400).json({ message: "Validation Error", errors });

    await ticketService.buyTicket(buyTicketDto);
    
    return res.status(200).json({ message: "Ticket(s) purchased successfully" });
});

export const deleteAllTicketsController = asyncHandler(async (_req: Request, res: Response) => {
    await ticketService.deleteAllTickets();
    return res.status(200).json({ message: "All tickets have been deleted successfully" });
});