"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackServiceImpl = void 0;
const transaction_model_1 = require("../../models/transaction.model");
const axios_1 = __importDefault(require("axios"));
const customError_utils_1 = require("../../utils/customError.utils");
const secretKey = process.env.PAYSTACK_SECRET_KEY;
class PaystackServiceImpl {
    async verifyTransaction(reference) {
        const existingTransaction = await transaction_model_1.Transaction.findOne({ reference });
        if (!existingTransaction) {
            throw new customError_utils_1.CustomError(404, "Transaction not found");
        }
        return existingTransaction.status === "success";
    }
    async createPaymentSession(amount, email) {
        const response = await axios_1.default.post("https://api.paystack.co/transaction/initialize", {
            email,
            amount: amount * 100
        }, {
            headers: {
                Authorization: `Bearer ${secretKey}`
            }
        });
        const authorizationUrl = response.data.data.authorization_url;
        const reference = response.data.data.reference;
        return { authorizationUrl, reference };
    }
    catch(error) {
        throw new customError_utils_1.CustomError(500, "Failed to create payment session");
    }
}
exports.PaystackServiceImpl = PaystackServiceImpl;
