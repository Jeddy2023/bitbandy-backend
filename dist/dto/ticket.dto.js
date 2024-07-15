"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyTicketDto = void 0;
const joi_1 = __importDefault(require("joi"));
class BuyTicketDto {
    constructor(data) {
        this.email = data.email;
        this.eventId = data.eventId;
        this.quantity = data.quantity;
    }
}
exports.BuyTicketDto = BuyTicketDto;
BuyTicketDto.validationSchema = joi_1.default.object({
    email: joi_1.default
        .string()
        .email()
        .required()
        .messages({
        "string.email": "Please provide a valid email address"
    }),
    eventId: joi_1.default.string().required(),
    quantity: joi_1.default.number().min(1).required().messages({
        'number.min': 'Quantity must be at least 1',
    }),
});
