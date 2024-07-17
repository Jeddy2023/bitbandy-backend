"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const event_model_1 = require("../../models/event.model");
const customError_utils_1 = require("../../utils/customError.utils");
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary-config"));
class EventServiceImpl {
    async createEvent(dto) {
        try {
            const eventDate = new Date(dto.eventDate);
            if (eventDate < new Date()) {
                throw new customError_utils_1.CustomError(400, "Event date cannot be in the past");
            }
            let result;
            try {
                result = await cloudinary_config_1.default.v2.uploader.upload(dto.eventImage);
            }
            catch (error) {
                throw new customError_utils_1.CustomError(500, "Failed to upload event image");
            }
            const event = {
                eventName: dto.eventName,
                eventDetails: dto.eventDetails,
                eventImage: result.secure_url,
                time: {
                    start: dto.start,
                    end: dto.end
                },
                location: {
                    place: dto.place,
                    state: dto.state,
                    area: dto.area,
                    city: dto.city
                },
                tickets: {
                    price: dto.price,
                    totalTickets: dto.totalTickets,
                    totalSold: 0
                },
                eventDate: dto.eventDate
            };
            await event_model_1.Event.create(event);
        }
        catch (error) {
            throw new customError_utils_1.CustomError(500, `Failed to create event: ${error.message}`);
        }
    }
    async updateEvent(id, dto) {
        const updateData = await event_model_1.Event.findById(id);
        if (!updateData) {
            throw new customError_utils_1.CustomError(404, "Event not found");
        }
        try {
            let result;
            if (dto.eventImage) {
                try {
                    result = await cloudinary_config_1.default.v2.uploader.upload(dto.eventImage);
                }
                catch (error) {
                    throw new customError_utils_1.CustomError(500, "Failed to upload event image");
                }
            }
            if (dto.eventName)
                updateData.eventName = dto.eventName;
            if (dto.eventDetails)
                updateData.eventDetails = dto.eventDetails;
            if (dto.eventImage && result)
                updateData.eventImage = result.secure_url;
            if (dto.start)
                updateData.time.start = dto.start;
            if (dto.end)
                updateData.time.end = dto.end;
            if (dto.place)
                updateData.location.place = dto.place;
            if (dto.state)
                updateData.location.state = dto.state;
            if (dto.area)
                updateData.location.area = dto.area;
            if (dto.city)
                updateData.location.city = dto.city;
            if (dto.price)
                updateData.tickets.price = dto.price;
            if (dto.totalTickets !== undefined) {
                if (dto.totalTickets < updateData.tickets.totalSold) {
                    throw new customError_utils_1.CustomError(400, "Total tickets cannot be less than total sold tickets");
                }
                updateData.tickets.totalTickets = dto.totalTickets;
            }
            if (dto.eventDate) {
                const newEventDate = new Date(dto.eventDate);
                if (newEventDate < new Date()) {
                    throw new customError_utils_1.CustomError(400, "Event date cannot be in the past");
                }
                updateData.eventDate = newEventDate;
            }
            await updateData.save();
        }
        catch (error) {
            throw new customError_utils_1.CustomError(500, `Failed to update event: ${error.message}`);
        }
    }
    async deleteEvent(id) {
        const event = await event_model_1.Event.findById(id);
        if (!event) {
            throw new customError_utils_1.CustomError(404, "Event not found");
        }
        await event_model_1.Event.deleteOne({ _id: id });
    }
    async getEventById(id) {
        const event = await event_model_1.Event.findById(id);
        if (!event) {
            throw new customError_utils_1.CustomError(404, "Event not found");
        }
        return {
            eventName: event.eventName,
            eventDetails: event.eventDetails,
            eventImage: event.eventImage,
            start: event.time.start,
            end: event.time.end,
            place: event.location.place,
            state: event.location.state,
            area: event.location.area,
            city: event.location.city,
            price: event.tickets.price,
            totalTickets: event.tickets.totalTickets,
            eventDate: event.eventDate
        };
    }
    async getEventByIdForAdmin(id) {
        const event = await event_model_1.Event.findById(id);
        if (!event) {
            throw new customError_utils_1.CustomError(404, "Event not found");
        }
        return event;
    }
    async getAllEvents(page, pageSize, filter) {
        const offset = (page - 1) * pageSize;
        let query = {};
        const now = new Date();
        switch (filter) {
            case 'Current Events':
                query = {
                    eventDate: {
                        $gte: (0, date_fns_1.startOfMonth)(now),
                        $lte: (0, date_fns_1.endOfMonth)(now)
                    }
                };
                break;
            case 'Upcoming Events':
                query = {
                    eventDate: {
                        $gt: (0, date_fns_1.endOfMonth)(now)
                    }
                };
                break;
            case 'Previous Events':
                query = {
                    eventDate: {
                        $lt: now
                    }
                };
                break;
            default:
                break;
        }
        const events = await event_model_1.Event.find(query)
            .skip(offset)
            .limit(pageSize)
            .sort({ createdAt: -1 });
        console.log(events);
        return events.map(event => {
            return {
                id: event._id,
                eventName: event.eventName,
                eventDetails: event.eventDetails,
                eventImage: event.eventImage,
                start: event.time.start,
                end: event.time.end,
                place: event.location.place,
                state: event.location.state,
                area: event.location.area,
                city: event.location.city,
                price: event.tickets.price,
                totalTickets: event.tickets.totalTickets,
                eventDate: event.eventDate,
            };
        });
    }
    async getLatestEvent() {
        const now = new Date();
        let event = await event_model_1.Event.findOne({
            eventDate: {
                $gt: now
            }
        })
            .sort({ eventDate: 1 })
            .exec();
        if (!event) {
            event = await event_model_1.Event.findOne({
                eventDate: {
                    $lte: now
                }
            })
                .sort({ eventDate: -1 })
                .exec();
            if (!event) {
                throw new customError_utils_1.CustomError(404, "No events found");
            }
        }
        return {
            id: event._id,
            eventName: event.eventName,
            eventDetails: event.eventDetails,
            eventImage: event.eventImage,
            start: event.time.start,
            end: event.time.end,
            place: event.location.place,
            state: event.location.state,
            area: event.location.area,
            city: event.location.city,
            price: event.tickets.price,
            totalTickets: event.tickets.totalTickets,
            eventDate: event.eventDate
        };
    }
    async getAllEventsForAdmin(page, pageSize, filter) {
        const offset = (page - 1) * pageSize;
        let query = {};
        const now = new Date();
        switch (filter) {
            case 'Current Events':
                query = {
                    eventDate: {
                        $gte: (0, date_fns_1.startOfMonth)(now),
                        $lte: (0, date_fns_1.endOfMonth)(now)
                    }
                };
                break;
            case 'Upcoming Events':
                query = {
                    eventDate: {
                        $gt: (0, date_fns_1.endOfMonth)(now)
                    }
                };
                break;
            case 'Previous Events':
                query = {
                    eventDate: {
                        $lt: now
                    }
                };
                break;
            default:
                break;
        }
        const events = await event_model_1.Event.find(query)
            .skip(offset)
            .limit(pageSize)
            .sort({ createdAt: -1 });
        return events;
    }
}
exports.default = EventServiceImpl;
