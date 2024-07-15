import mongoose, { Document, Schema } from "mongoose";

interface Time {
    start: string;
    end: string;
}

interface Location {
    place: string;
    state: string;
    area: string;
    city: string;
}

interface Tickets {
    price: number;
    totalTickets: number;
    totalSold: number;
}

export interface IEvent extends Document{
    _id: string;
    eventName: string;
    eventDetails: string;
    eventImage: string;
    time: Time;
    location: Location;
    tickets: Tickets;
    eventDate: Date;
}


const TimeSchema: Schema<Time> = new Schema({
    start: { type: String, required: true },
    end: { type: String, required: true }
});

const LocationSchema: Schema<Location> = new Schema({
    place: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true }
});

const TicketsSchema: Schema<Tickets> = new Schema({
    price: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    totalSold: { type: Number, required: true, default: 0 }
});

const EventSchema: Schema<IEvent> = new Schema({
    eventName: { type: String, required: true },
    eventDetails: { type: String, required: true },
    eventImage: { type: String, required: true },
    time: { type: TimeSchema, required: true },
    location: { type: LocationSchema, required: true },
    tickets: { type: TicketsSchema, required: true },
    eventDate: { type: Date, required: true }
}, { timestamps: true })

export const Event = mongoose.model<IEvent>("Event", EventSchema);