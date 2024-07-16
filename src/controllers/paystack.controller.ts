import { PaystackService } from "../services/paystack.service";
import { PaystackServiceImpl } from "../services/impl/paystack.service.impl";
import { Request, Response } from "express";
import { Transaction } from "../models/transaction.model";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import crypto from "crypto";

const paystackService: PaystackService = new PaystackServiceImpl();

export const createPaymentSession = asyncHandler(async (req: Request, res: Response) => {
  const { amount, email } = req.body;

  try {
    const { authorizationUrl, reference } = await paystackService.createPaymentSession(amount, email);
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
    const { event } = req.body;

    if (event === "charge.success") {

      // save transaction to database
      const transaction = new Transaction({
        amount: req.body.data.amount,
        status: "success",
        reference: req.body.data.reference,
        timestamp: new Date(),
      });

      await transaction.save();
      return res.status(200).json({ message: "Payment successful" });
    } else if (event === "charge.failed") {
      return res.status(400).json({ message: "Payment failed" });
    } else if (event === "transfer.success") {
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

export const verifyTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { reference } = req.body;
  const status = await paystackService.verifyTransaction(reference);
  return res.status(200).json({ status });
});
