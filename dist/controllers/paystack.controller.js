"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransaction = exports.webhook = exports.createPaymentSession = void 0;
const paystack_service_impl_1 = require("../services/impl/paystack.service.impl");
const transaction_model_1 = require("../models/transaction.model");
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const crypto_1 = __importDefault(require("crypto"));
const paystackService = new paystack_service_impl_1.PaystackServiceImpl();
exports.createPaymentSession = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { amount, email } = req.body;
    try {
        const { authorizationUrl, reference } = await paystackService.createPaymentSession(amount, email);
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
        const { event } = req.body;
        if (event === "charge.success") {
            // save transaction to database
            const transaction = new transaction_model_1.Transaction({
                amount: req.body.data.amount,
                status: "success",
                reference: req.body.data.reference,
                timestamp: new Date(),
            });
            await transaction.save();
            return res.status(200).json({ message: "Payment successful" });
        }
        else if (event === "charge.failed") {
            return res.status(400).json({ message: "Payment failed" });
        }
        else if (event === "transfer.success") {
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
exports.verifyTransaction = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { reference } = req.body;
    const status = await paystackService.verifyTransaction(reference);
    return res.status(200).json({ status });
});
