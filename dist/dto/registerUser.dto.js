"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const joi_1 = __importDefault(require("joi"));
class RegisterUserDto {
    constructor(data) {
        this.fullName = data.fullName;
        this.password = data.password;
        this.email = data.email;
    }
}
exports.RegisterUserDto = RegisterUserDto;
RegisterUserDto.validationSchema = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    password: joi_1.default
        .string()
        .pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*])'))
        .min(5)
        .max(16)
        .required()
        .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter and one symbol",
        "string.min": "Password must contain at least 5 characters",
        "string.max": "Password must be at most 16 characters long"
    }),
    email: joi_1.default
        .string()
        .email()
        .required()
        .messages({
        "string.email": "Please provide a valid email address"
    }),
});
