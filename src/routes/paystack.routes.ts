import { Router } from "express";
import { createPaymentSession, webhook, verifyTransaction } from "../controllers/paystack.controller";

const router = Router();

router.post("/create-payment-session", createPaymentSession);
router.post("/webhook", webhook);
router.post("/verify-transaction", verifyTransaction);

export default router;