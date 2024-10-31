"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmailSpamController = exports.getEmailSpamByIdController = exports.deleteEmailSpamController = exports.updateEmailSpamController = exports.createEmailSpamController = void 0;
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const validator_utils_1 = require("../utils/validator.utils");
const createEmailSpam_dto_1 = require("../dto/createEmailSpam.dto");
const emailspam_service_impl_1 = __importDefault(require("../services/impl/emailspam.service.impl"));
const emailSpamService = new emailspam_service_impl_1.default();
exports.createEmailSpamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const createEmailSpamDto = new createEmailSpam_dto_1.CreateEmailSpamDto(req.body);
    const errors = (0, validator_utils_1.validator)(createEmailSpam_dto_1.CreateEmailSpamDto, createEmailSpamDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await emailSpamService.createEmailSpam(createEmailSpamDto);
    return res.status(201).json({ message: "Email added to spam list successfully" });
});
exports.updateEmailSpamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const updateEmailSpamDto = new createEmailSpam_dto_1.UpdateEmailSpamDto(req.body.email, req.body.name);
    const errors = (0, validator_utils_1.validator)(createEmailSpam_dto_1.UpdateEmailSpamDto, updateEmailSpamDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await emailSpamService.updateEmailSpam(req.params.id, updateEmailSpamDto);
    return res.status(200).json({ message: "Email spam entry updated successfully" });
});
exports.deleteEmailSpamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    await emailSpamService.deleteEmailSpam(req.params.id);
    return res.status(200).json({ message: "Email spam entry deleted successfully" });
});
exports.getEmailSpamByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const emailSpam = await emailSpamService.getEmailSpamById(req.params.id);
    return res.status(200).json(emailSpam);
});
exports.getAllEmailSpamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const emailSpamList = await emailSpamService.getAllEmailSpam(page, pageSize);
    return res.status(200).json(emailSpamList);
});
