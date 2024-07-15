"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventDto = exports.CreateEventDto = void 0;
const joi_1 = __importDefault(require("joi"));
class CreateEventDto {
    constructor(eventName, eventDetails, eventImage, start, end, place, state, area, city, price, totalTickets, eventDate) {
        this.eventName = eventName;
        this.eventDetails = eventDetails;
        this.eventImage = eventImage;
        this.start = start;
        this.end = end;
        this.place = place;
        this.state = state;
        this.area = area;
        this.city = city;
        this.price = price;
        this.totalTickets = totalTickets;
        this.eventDate = eventDate;
    }
}
exports.CreateEventDto = CreateEventDto;
CreateEventDto.validationSchema = joi_1.default.object({
    eventName: joi_1.default.string().required(),
    eventDetails: joi_1.default.string().required(),
    eventImage: joi_1.default.string().required(),
    start: joi_1.default.string().required(),
    end: joi_1.default.string().required(),
    place: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    area: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    price: joi_1.default.number().min(0).required().messages({
        "number.min": "Price must be a positive number"
    }),
    totalTickets: joi_1.default.number().min(1).required().messages({
        "number.min": "Total tickets must be at least 1"
    }),
    eventDate: joi_1.default.date().required()
});
class UpdateEventDto {
    constructor(eventName, eventDetails, eventImage, start, end, place, state, area, city, price, totalTickets, eventDate) {
        this.eventName = eventName;
        this.eventDetails = eventDetails;
        this.eventImage = eventImage;
        this.start = start;
        this.end = end;
        this.place = place;
        this.state = state;
        this.area = area;
        this.city = city;
        this.price = price;
        this.totalTickets = totalTickets;
        this.eventDate = eventDate;
    }
}
exports.UpdateEventDto = UpdateEventDto;
UpdateEventDto.validationSchema = joi_1.default.object({
    eventName: joi_1.default.string().optional(),
    eventDetails: joi_1.default.string().optional(),
    eventImage: joi_1.default.string().required(),
    start: joi_1.default.string().optional(),
    end: joi_1.default.string().optional(),
    place: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    area: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    price: joi_1.default.number().min(0).optional().messages({
        "number.min": "Price must be a positive number"
    }),
    totalTickets: joi_1.default.number().min(1).optional().messages({
        "number.min": "Total tickets must be at least 1"
    }),
    eventDate: joi_1.default.date().optional()
});
