import Joi from "joi";

export class CreateEventDto {
    eventName: string;
    eventDetails: string;
    eventImage: string;
    start: string;
    end: string;
    place: string;
    state: string;
    area: string;
    city: string;
    price: number;
    totalTickets: number;
    eventDate: Date;

    static validationSchema = Joi.object({
        eventName: Joi.string().required(),
        eventDetails: Joi.string().required(),
        eventImage: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        place: Joi.string().required(),
        state: Joi.string().required(),
        area: Joi.string().required(),
        city: Joi.string().required(),
        price: Joi.number().min(0).required().messages({
            "number.min": "Price must be a positive number"
        }),
        totalTickets: Joi.number().min(1).required().messages({
            "number.min": "Total tickets must be at least 1"
        }),
        eventDate: Joi.date().required()
    });

    constructor(
        eventName: string,
        eventDetails: string,
        eventImage: string,
        start: string,
        end: string,
        place: string,
        state: string,
        area: string,
        city: string,
        price: number,
        totalTickets: number,
        eventDate: Date
    ) {
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

export class UpdateEventDto {
    eventName?: string;
    eventDetails?: string;
    eventImage?: string;
    start?: string;
    end?: string;
    place?: string;
    state?: string;
    area?: string;
    city?: string;
    price?: number;
    totalTickets?: number;
    eventDate?: Date;

    static validationSchema = Joi.object({
        eventName: Joi.string().optional(),
        eventDetails: Joi.string().optional(),
        eventImage: Joi.string().required(),
        start: Joi.string().optional(),
        end: Joi.string().optional(),
        place: Joi.string().optional(),
        state: Joi.string().optional(),
        area: Joi.string().optional(),
        city: Joi.string().optional(),
        price: Joi.number().min(0).optional().messages({
            "number.min": "Price must be a positive number"
        }),
        totalTickets: Joi.number().min(1).optional().messages({
            "number.min": "Total tickets must be at least 1"
        }),
        eventDate: Joi.date().optional()
    });

    constructor(
        eventName?: string,
        eventDetails?: string,
        eventImage?: string,
        start?: string,
        end?: string,
        place?: string,
        state?: string,
        area?: string,
        city?: string,
        price?: number,
        totalTickets?: number,
        eventDate?: Date
    ) {
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

// GetEventDTO.ts
export interface GetEventDTO {
    id?: string;
    eventName: string;
    eventDetails: string;
    eventImage: string;
    start: string;
    end: string;
    place: string;
    state: string;
    area: string;
    city: string;
    price: number;
    totalTickets: number;
    eventDate: Date;
}
