"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.createPaymentSession = void 0;
const paystack_service_impl_1 = require("../services/impl/paystack.service.impl");
const ticket_dto_1 = require("../dto/ticket.dto");
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const crypto_1 = __importDefault(require("crypto"));
const ticket_service_impl_1 = __importDefault(require("../services/impl/ticket.service.impl"));
const paystackService = new paystack_service_impl_1.PaystackServiceImpl();
const ticketService = new ticket_service_impl_1.default();
exports.createPaymentSession = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { amount, email, eventId, quantity } = req.body;
    try {
        const { authorizationUrl, reference } = await paystackService.createPaymentSession(amount, email, eventId, quantity);
        res.json({ authorizationUrl, reference });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.webhook = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    // validate the request
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto_1.default.createHmac('sha512', secretKey).update(JSON.stringify(req.body), 'utf8').digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
        const { event, data } = req.body;
        if (event === "charge.success") {
            // send ticket to users email
            const buyTicketDto = new ticket_dto_1.BuyTicketDto({
                email: data.customer.email,
                eventId: data.metadata.eventId,
                quantity: data.metadata.quantity
            });
            await ticketService.buyTicket(buyTicketDto);
            return res.status(200).json({ message: "Payment successful" });
        }
        else if (event === "charge.failed") {
            return res.status(400).json({ message: "Payment failed" });
        }
        else if (event === "transfer.success") {
            // send ticket to users email
            const buyTicketDto = new ticket_dto_1.BuyTicketDto({
                email: event.customer.email,
                eventId: event.metadata.event_id,
                quantity: event.metadata.quantity
            });
            await ticketService.buyTicket(buyTicketDto);
            return res.status(200).json({ message: "Transfer successful" });
        }
        else if (event === "transfer.failed") {
            return res.status(400).json({ message: "Transfer failed" });
        }
        else if (event === "transfer.reversed") {
            return res.status(400).json({ message: "Transfer reversed" });
        }
        else {
            return res.status(400).json({ message: "Unknown event" });
        }
    }
    else {
        return res.status(400).json({ message: "Invalid signature" });
    }
});
