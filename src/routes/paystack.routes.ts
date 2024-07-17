import { Router } from "express";
import { createPaymentSession, webhook } from "../controllers/paystack.controller";

const router = Router();

router.post("/create-payment-session", createPaymentSession);
router.post("/webhook", webhook);

export default router;