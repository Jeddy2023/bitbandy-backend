"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailController = void 0;
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const contact_service_impl_1 = __importDefault(require("../services/impl/contact.service.impl"));
const contactService = new contact_service_impl_1.default();
exports.sendEmailController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { email, message, firstName, lastName } = req.body;
    if (!email || !firstName || !message || !lastName) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    await contactService.sendEmail({ email, message, firstName, lastName });
    res.status(200).json({ message: "Email sent successfully" });
});
