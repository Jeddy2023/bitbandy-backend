import Joi from "joi";

export class RegisterUserDto {
  fullName: string;
  password: string;
  email: string;

  static validationSchema = Joi.object({
    fullName: Joi.string().required(),
    password: Joi
      .string()
      .pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*])'))
      .min(5)
      .max(16)
      .required()
      .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter and one symbol",
        "string.min": "Password must contain at least 5 characters",
        "string.max": "Password must be at most 16 characters long"
      }),
    email: Joi
      .string()
      .email()
      .required()
      .messages({
        "string.email": "Please provide a valid email address"
      }),
  });

  constructor(data: RegisterUserDto) {
    this.fullName = data.fullName;
    this.password = data.password;
    this.email = data.email;
  }
}
