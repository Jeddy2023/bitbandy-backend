"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_utills_1 = require("../../utils/email.utills");
class ContactServiceImpl {
    async sendEmail(data) {
        const { email, message, firstName, lastName } = data;
        const templatePath = "../template/customercareMessage.handlebars";
        const subject = "Customer Care Message";
        const email1 = "jkenosuh@gmail.com";
        await (0, email_utills_1.sendEmail)(email1, subject, { email, message, firstName, lastName }, templatePath, email);
    }
}
exports.default = ContactServiceImpl;
