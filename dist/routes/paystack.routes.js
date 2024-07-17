"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paystack_controller_1 = require("../controllers/paystack.controller");
const router = (0, express_1.Router)();
router.post("/create-payment-session", paystack_controller_1.createPaymentSession);
router.post("/webhook", paystack_controller_1.webhook);
router.post("/verify-transaction", paystack_controller_1.verifyTransaction);
exports.default = router;
