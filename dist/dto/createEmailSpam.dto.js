"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailSpamDto = exports.CreateEmailSpamDto = void 0;
const joi_1 = __importDefault(require("joi"));
class CreateEmailSpamDto {
    constructor(data) {
        this.eventId = data.eventId;
        this.email = data.email;
        this.name = data.name;
    }
}
exports.CreateEmailSpamDto = CreateEmailSpamDto;
CreateEmailSpamDto.validationSchema = joi_1.default.object({
    eventId: joi_1.default.string().required().messages({
        "string.empty": "Event ID is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Please provide a valid email address",
        "string.empty": "Email is required",
    }),
    name: joi_1.default.string().required().messages({
        "string.empty": "Name is required",
    }),
});
class UpdateEmailSpamDto {
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
exports.UpdateEmailSpamDto = UpdateEmailSpamDto;
