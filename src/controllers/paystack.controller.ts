import { PaystackService } from "../services/paystack.service";
import { PaystackServiceImpl } from "../services/impl/paystack.service.impl";
import { Request, Response } from "express";
import { BuyTicketDto } from "../dto/ticket.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import crypto from "crypto";
import { TicketService } from "../services/ticket.service";
import TicketServiceImpl from "../services/impl/ticket.service.impl";

const paystackService: PaystackService = new PaystackServiceImpl();
const ticketService: TicketService = new TicketServiceImpl();

export const createPaymentSession = asyncHandler(async (req: Request, res: Response) => {
  const { amount, email, eventId, quantity } = req.body;

  try {
    const { authorizationUrl, reference } = await paystackService.createPaymentSession(amount, email, eventId, quantity);
    res.json({ authorizationUrl, reference });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export const webhook = asyncHandler(async (req: Request, res: Response) => {

  // validate the request
  const secretKey = process.env.PAYSTACK_SECRET_KEY as string;
  const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(req.body), 'utf8').digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    const { event, data } = req.body;

    if (event === "charge.success") {

      // send ticket to users email
      const buyTicketDto = new BuyTicketDto({
        email: data.customer.email,
        eventId: data.metadata.eventId,
        quantity: data.metadata.quantity
      });

      await ticketService.buyTicket(buyTicketDto);

      return res.status(200).json({ message: "Payment successful" });
    } else if (event === "charge.failed") {
      return res.status(400).json({ message: "Payment failed" });
    } else if (event === "transfer.success") {
      
      // send ticket to users email
      const buyTicketDto = new BuyTicketDto({
        email: event.customer.email,
        eventId: event.metadata.event_id,
        quantity: event.metadata.quantity
      });

      await ticketService.buyTicket(buyTicketDto);
      return res.status(200).json({ message: "Transfer successful" });
    } else if (event === "transfer.failed") {
      return res.status(400).json({ message: "Transfer failed" });
    } else if (event === "transfer.reversed") {
      return res.status(400).json({ message: "Transfer reversed" });
    } else {
      return res.status(400).json({ message: "Unknown event" });
    }
  } else {
    return res.status(400).json({ message: "Invalid signature" });
  }
});
