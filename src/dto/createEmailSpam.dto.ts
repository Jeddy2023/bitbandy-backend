import Joi from "joi";

export class CreateEmailSpamDto {
  eventId: string;
  email: string;
  name: string;

  static validationSchema = Joi.object({
    eventId: Joi.string().required().messages({
      "string.empty": "Event ID is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
    }),
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
    }),
  });

  constructor(data: CreateEmailSpamDto) {
    this.eventId = data.eventId;
    this.email = data.email;
    this.name = data.name;
  }
}

export class UpdateEmailSpamDto {
    constructor(
        public email?: string,
        public name?: string
    ) {}
}
