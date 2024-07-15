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
// Function to send an email
const sendEmail = async (to, subject, html, template) => {
    const source = fs_1.default.readFileSync(path_1.default.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars_1.default.compile(source);
    try {
        const mailOptions = {
            from: "BitBandy <bitbandy113@gmail.com>",
            to,
            subject,
            html: compiledTemplate(html),
        };
        // Set Content-Type header for HTML content
        mailOptions.contentType = "text/html; charset=utf-8";
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
exports.sendEmail = sendEmail;
