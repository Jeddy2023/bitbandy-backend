import { SendCustomerEmailDto } from "../dto/email.dto";

export interface ContactService {
  sendEmail(data: SendCustomerEmailDto): Promise<void>;
}