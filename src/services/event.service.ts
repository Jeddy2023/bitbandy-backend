import { CreateEventDto, GetEventDTO, UpdateEventDto } from "../dto/event.dto";
import { IEvent } from "../models/event.model";


export interface EventService {
    createEvent(dto: CreateEventDto): Promise<void>;
    updateEvent(id: string, dto: UpdateEventDto): Promise<void>;
    deleteEvent(id: string): Promise<void>;
    getEventById(id: string): Promise<GetEventDTO | null>;
    getEventByIdForAdmin(id: string): Promise<IEvent | null>;
    getAllEvents(page: number, pageSize: number, filter: string): Promise<GetEventDTO[]>;
    getLatestEvent(): Promise<GetEventDTO>; 
    getAllEventsForAdmin(page: number, pageSize: number, filter: string): Promise<IEvent[]>;
}