import nodemailer, { SendMailOptions } from "nodemailer";

import handlebars from "handlebars";
import path from "path";
import fs from "fs";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Replace with a secure method to store the password
  },
});

let compiledTemplate: HandlebarsTemplateDelegate | null = null;

const getTemplate = (templatePath: string): HandlebarsTemplateDelegate => {
  if (!compiledTemplate) {
    const source = fs.readFileSync(templatePath, "utf8");
    compiledTemplate = handlebars.compile(source);
  }
  return compiledTemplate;
};

export const sendEmail = async (
  to: string,
  subject: string,
  templateData: {},
  templatePath: string,
  from: string = "BitBandy <bitbandy113@gmail.com>"
): Promise<void> => {
  const template = getTemplate(path.join(__dirname, templatePath));

  try {
    const mailOptions: SendMailOptions = {
      from,
      to,
      subject,
      html: template(templateData),
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};