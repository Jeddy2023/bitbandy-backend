import mongoose, { Document, Schema } from "mongoose";
import { IEvent } from "./event.model";

export interface IEmailSpam extends Document {
    _id: mongoose.Types.ObjectId; 
    event: IEvent;
    email: string;
    name: string;
}

const EmailSpamSchema: Schema<IEmailSpam> = new Schema({
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true }, 
}, { timestamps: true })

export const EmailSpam = mongoose.model<IEmailSpam>("EmailSpam", EmailSpamSchema);