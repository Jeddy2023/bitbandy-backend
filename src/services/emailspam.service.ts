import { CreateEmailSpamDto, UpdateEmailSpamDto } from "../dto/createEmailSpam.dto";
import { IEmailSpam } from "../models/emailspam.model";

export interface EmailSpamService {
    createEmailSpam(dto: CreateEmailSpamDto): Promise<void>;
    updateEmailSpam(id: string, dto: UpdateEmailSpamDto): Promise<void>;
    deleteEmailSpam(id: string): Promise<void>;
    getEmailSpamById(id: string): Promise<IEmailSpam | null>;
    getAllEmailSpam(page: number, pageSize: number): Promise<IEmailSpam[]>;
}
