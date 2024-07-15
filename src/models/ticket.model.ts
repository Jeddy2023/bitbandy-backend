import mongoose, { Document, Schema } from "mongoose";
import { IEvent } from "./event.model";

export interface ITicket extends Document {
    _id: mongoose.Types.ObjectId; 
    email: string;
    event: IEvent;
    status: "paid" | "used";
    ticketNumber: number;
}

const TicketSchema: Schema<ITicket> = new Schema({
    email: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: { type: String, enum: ["paid", "used"], required: true, default: "paid" },
    ticketNumber: { type: Number, required: true }
}, { timestamps: true })

export const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);