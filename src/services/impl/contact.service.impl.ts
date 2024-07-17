import { SendCustomerEmailDto } from "../../dto/email.dto";
import { sendEmail } from "../../utils/email.utills";
import { ContactService } from "../contact.service";

class ContactServiceImpl implements ContactService {
    async sendEmail(data: SendCustomerEmailDto): Promise<void> {
        const { email, message, firstName, lastName } = data;

        const templatePath = "../template/customercareMessage.handlebars";
        const subject = "Customer Care Message"; 
        const email1 = "jkenosuh@gmail.com";

        await sendEmail(email1, subject, { email, message, firstName, lastName }, templatePath, email);
    }
}

export default ContactServiceImpl;