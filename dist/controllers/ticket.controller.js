"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTicketsController = exports.buyTicketController = void 0;
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const ticket_service_impl_1 = __importDefault(require("../services/impl/ticket.service.impl"));
const ticket_dto_1 = require("../dto/ticket.dto");
const validator_utils_1 = require("../utils/validator.utils");
const ticketService = new ticket_service_impl_1.default();
exports.buyTicketController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const buyTicketDto = new ticket_dto_1.BuyTicketDto(req.body);
    const errors = (0, validator_utils_1.validator)(ticket_dto_1.BuyTicketDto, buyTicketDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await ticketService.buyTicket(buyTicketDto);
    return res.status(200).json({ message: "Ticket(s) purchased successfully" });
});
exports.deleteAllTicketsController = (0, asyncHandler_middleware_1.asyncHandler)(async (_req, res) => {
    await ticketService.deleteAllTickets();
    return res.status(200).json({ message: "All tickets have been deleted successfully" });
});
