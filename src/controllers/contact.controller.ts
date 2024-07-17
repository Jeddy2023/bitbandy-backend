import { SendCustomerEmailDto } from "../dto/email.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { Request, Response } from "express";
import ContactServiceImpl from "../services/impl/contact.service.impl";
import { ContactService } from "../services/contact.service";

const contactService: ContactService = new ContactServiceImpl();

export const sendEmailController = asyncHandler(async (req: Request, res: Response) => {
    const { email, message, firstName, lastName }: SendCustomerEmailDto = req.body;
  
    if (!email || !firstName || !message || !lastName ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
  
    await contactService.sendEmail({ email, message, firstName, lastName });
  
    res.status(200).json({ message: "Email sent successfully" });
  });