"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create a nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Replace with a secure method to store the password
    },
});
let compiledTemplate = null;
const getTemplate = (templatePath) => {
    if (!compiledTemplate) {
        const source = fs_1.default.readFileSync(templatePath, "utf8");
        compiledTemplate = handlebars_1.default.compile(source);
    }
    return compiledTemplate;
};
const sendEmail = async (to, subject, templateData, templatePath, from = "BitBandy <bitbandy113@gmail.com>") => {
    const template = getTemplate(path_1.default.join(__dirname, templatePath));
    try {
        const mailOptions = {
            from,
            to,
            subject,
            html: template(templateData),
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
exports.sendEmail = sendEmail;
