"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.extractTokenFromRequest = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const customError_utils_1 = require("./customError.utils");
dotenv_1.default.config();
const generateToken = async (userId, isAdmin) => {
    return jsonwebtoken_1.default.sign({ sub: userId, isAdmin }, process.env.JWT_KEY, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
const extractTokenFromRequest = (req) => {
    const header = req.headers['authorization'];
    if (!header) {
        throw new customError_utils_1.CustomError(401, "Token not provided");
    }
    return header.split(" ")[1];
};
exports.extractTokenFromRequest = extractTokenFromRequest;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    }
    catch (error) {
        throw new customError_utils_1.CustomError(401, "Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
