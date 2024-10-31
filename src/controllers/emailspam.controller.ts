import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";
import { EmailSpamService } from "../services/emailspam.service";
import { validator } from "../utils/validator.utils";
import { CreateEmailSpamDto, UpdateEmailSpamDto } from "../dto/createEmailSpam.dto";
import EmailSpamServiceImpl from "../services/impl/emailspam.service.impl";

const emailSpamService: EmailSpamService = new EmailSpamServiceImpl();

export const createEmailSpamController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const createEmailSpamDto = new CreateEmailSpamDto(req.body);

    const errors = validator(CreateEmailSpamDto, createEmailSpamDto);
    if (errors) return res.status(400).json({ message: "Validation Error", errors });

    await emailSpamService.createEmailSpam(createEmailSpamDto);
    return res.status(201).json({ message: "Email added to spam list successfully" });
});

export const updateEmailSpamController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const updateEmailSpamDto = new UpdateEmailSpamDto(req.body.email, req.body.name);

    const errors = validator(UpdateEmailSpamDto, updateEmailSpamDto);
    if (errors) return res.status(400).json({ message: "Validation Error", errors });

    await emailSpamService.updateEmailSpam(req.params.id, updateEmailSpamDto);
    return res.status(200).json({ message: "Email spam entry updated successfully" });
});

export const deleteEmailSpamController = asyncHandler(async (req: CustomRequest, res: Response) => {
    await emailSpamService.deleteEmailSpam(req.params.id);
    return res.status(200).json({ message: "Email spam entry deleted successfully" });
});

export const getEmailSpamByIdController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const emailSpam = await emailSpamService.getEmailSpamById(req.params.id);
    return res.status(200).json(emailSpam);
});

export const getAllEmailSpamController = asyncHandler(async (req: CustomRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const emailSpamList = await emailSpamService.getAllEmailSpam(page, pageSize);
    return res.status(200).json(emailSpamList);
});
