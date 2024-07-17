"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackServiceImpl = void 0;
const axios_1 = __importDefault(require("axios"));
const customError_utils_1 = require("../../utils/customError.utils");
const secretKey = process.env.PAYSTACK_SECRET_KEY;
class PaystackServiceImpl {
    async createPaymentSession(amount, email, eventId, quantity) {
        try {
            const response = await axios_1.default.post("https://api.paystack.co/transaction/initialize", {
                email,
                amount: amount * 100,
                metadata: { eventId, quantity }
            }, {
                headers: {
                    Authorization: `Bearer ${secretKey}`
                }
            });
            const authorizationUrl = response.data.data.authorization_url;
            const reference = response.data.data.reference;
            return { authorizationUrl, reference };
        }
        catch (error) {
            throw new customError_utils_1.CustomError(500, "Failed to create payment session");
        }
    }
}
exports.PaystackServiceImpl = PaystackServiceImpl;
