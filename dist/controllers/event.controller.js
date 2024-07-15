"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEventsForAdminController = exports.getLatestEventController = exports.getAllEventsController = exports.getEventByIdForAdminController = exports.getEventByIdController = exports.deleteEventController = exports.updateEventController = exports.createEventController = void 0;
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const event_service_impl_1 = __importDefault(require("../services/impl/event.service.impl"));
const event_dto_1 = require("../dto/event.dto");
const validator_utils_1 = require("../utils/validator.utils");
const eventService = new event_service_impl_1.default();
exports.createEventController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    if (!req.file)
        return res.status(400).json({ message: "Validation Error", errors: ["Event image is required as PNG, JPG or JPEG!"], });
    const createEventDto = new event_dto_1.CreateEventDto(req.body.eventName, req.body.eventDetails, req.file.path || '', req.body.start, req.body.end, req.body.place, req.body.state, req.body.area, req.body.city, req.body.price, req.body.totalTickets, req.body.eventDate);
    const errors = (0, validator_utils_1.validator)(event_dto_1.CreateEventDto, createEventDto);
    console.log("Errors", errors);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await eventService.createEvent(createEventDto);
    return res.status(201).json({ message: "Event created successfully" });
});
exports.updateEventController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const updateEventDto = new event_dto_1.UpdateEventDto(req.body.eventName, req.body.eventDetails, req.file?.path || '', req.body.start, req.body.end, req.body.place, req.body.state, req.body.area, req.body.city, req.body.price, req.body.totalTickets, req.body.eventDate);
    const errors = (0, validator_utils_1.validator)(event_dto_1.UpdateEventDto, updateEventDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await eventService.updateEvent(req.params.id, updateEventDto);
    return res.status(200).json({ message: "Event updated successfully" });
});
exports.deleteEventController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    await eventService.deleteEvent(req.params.id);
    return res.status(200).json({ message: "Event deleted successfully" });
});
exports.getEventByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const event = await eventService.getEventById(req.params.id);
    return res.status(200).json(event);
});
exports.getEventByIdForAdminController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const event = await eventService.getEventByIdForAdmin(req.params.id);
    return res.status(200).json(event);
});
exports.getAllEventsController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filter = req.query.filter;
    const events = await eventService.getAllEvents(page, pageSize, filter);
    return res.status(200).json(events);
});
exports.getLatestEventController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const latestEvent = await eventService.getLatestEvent();
    return res.status(200).json(latestEvent);
});
exports.getAllEventsForAdminController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filter = req.query.filter;
    const events = await eventService.getAllEventsForAdmin(page, pageSize, filter);
    return res.status(200).json(events);
});
