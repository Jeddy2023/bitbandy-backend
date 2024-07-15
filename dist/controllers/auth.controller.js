"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const registerUser_dto_1 = require("../dto/registerUser.dto");
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const auth_service_impl_1 = __importDefault(require("../services/impl/auth.service.impl"));
const validator_utils_1 = require("../utils/validator.utils");
const authService = new auth_service_impl_1.default();
exports.registerController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const registerUserDto = new registerUser_dto_1.RegisterUserDto(req.body);
    const errors = (0, validator_utils_1.validator)(registerUser_dto_1.RegisterUserDto, registerUserDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await authService.register(registerUserDto);
    return res.status(201).json({ message: "Registration successful" });
});
exports.loginController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    return res.status(200).json({ message: "Login successful", token, user });
});
