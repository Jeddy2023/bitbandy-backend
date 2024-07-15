"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TimeSchema = new mongoose_1.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true }
});
const LocationSchema = new mongoose_1.Schema({
    place: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true }
});
const TicketsSchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    totalSold: { type: Number, required: true, default: 0 }
});
const EventSchema = new mongoose_1.Schema({
    eventName: { type: String, required: true },
    eventDetails: { type: String, required: true },
    eventImage: { type: String, required: true },
    time: { type: TimeSchema, required: true },
    location: { type: LocationSchema, required: true },
    tickets: { type: TicketsSchema, required: true },
    eventDate: { type: Date, required: true }
}, { timestamps: true });
exports.Event = mongoose_1.default.model("Event", EventSchema);
