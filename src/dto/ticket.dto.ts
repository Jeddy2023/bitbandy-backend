import Joi from "joi";

export class BuyTicketDto {
    email: string;
    eventId: string;
    quantity: number;

    static validationSchema = Joi.object({
        email: Joi
            .string()
            .email()
            .required()
            .messages({
                "string.email": "Please provide a valid email address"
            }),
        eventId: Joi.string().required(),
        quantity: Joi.number().min(1).required().messages({
            'number.min': 'Quantity must be at least 1',
        }),
    });

    constructor(data: BuyTicketDto) {
        this.email = data.email;
        this.eventId = data.eventId;
        this.quantity = data.quantity;
    }
}