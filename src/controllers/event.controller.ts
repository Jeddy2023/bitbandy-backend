import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";
import { EventService } from "../services/event.service";
import EventServiceImpl from "../services/impl/event.service.impl";
import { CustomRequestWithFile } from "../utils/customRequestWithFile.util";
import { CreateEventDto, UpdateEventDto } from "../dto/event.dto";
import { validator } from "../utils/validator.utils";

const eventService: EventService = new EventServiceImpl();

export const createEventController = asyncHandler(async (req: CustomRequestWithFile, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "Validation Error", errors: ["Event image is required as PNG, JPG or JPEG!"], });
    const createEventDto = new CreateEventDto(
        req.body.eventName,
        req.body.eventDetails,
        req.file.path || '',
        req.body.start,
        req.body.end,
        req.body.place,
        req.body.state,
        req.body.area,
        req.body.city,
        req.body.price,
        req.body.totalTickets,
        req.body.eventDate
    );

    const errors = validator(CreateEventDto, createEventDto);
    console.log("Errors",errors)
    if (errors) return res.status(400).json({ message: "Validation Error", errors });
    await eventService.createEvent(createEventDto);
    return res.status(201).json({ message: "Event created successfully" });
})

export const updateEventController = asyncHandler(async (req: CustomRequestWithFile, res: Response) => {
    const updateEventDto = new UpdateEventDto(
        req.body.eventName,
        req.body.eventDetails,
        req.file?.path || '',  
        req.body.start,
        req.body.end,
        req.body.place,
        req.body.state,
        req.body.area,
        req.body.city,
        req.body.price,
        req.body.totalTickets,
        req.body.eventDate
    );

    const errors = validator(UpdateEventDto, updateEventDto);
    if (errors) return res.status(400).json({ message: "Validation Error", errors });

    await eventService.updateEvent(req.params.id, updateEventDto);
    return res.status(200).json({ message: "Event updated successfully" });
});


export const deleteEventController = asyncHandler(async (req: CustomRequest, res: Response) => {
    await eventService.deleteEvent(req.params.id);
    return res.status(200).json({ message: "Event deleted successfully" });
})

export const getEventByIdController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const event = await eventService.getEventById(req.params.id);
    return res.status(200).json(event);
})

export const getEventByIdForAdminController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const event = await eventService.getEventByIdForAdmin(req.params.id);
    return res.status(200).json(event);
})

export const getAllEventsController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const filter = req.query.filter as string;
    const events = await eventService.getAllEvents(page, pageSize, filter);
    return res.status(200).json(events);
})

export const getLatestEventController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const latestEvent = await eventService.getLatestEvent();
    return res.status(200).json(latestEvent);
})

export const getAllEventsForAdminController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const filter = req.query.filter as string;
    const events = await eventService.getAllEventsForAdmin(page, pageSize, filter);
    return res.status(200).json(events);
})