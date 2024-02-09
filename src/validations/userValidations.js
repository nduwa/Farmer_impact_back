import Joi from "joi";
const userValidationSchema = Joi.object({
    Name_Full: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base":
        "your name can not contain numbers and special characters",
      "string.empty": "your name can not be empty",
      "any.required": "The  name is required",
      "string.min": " name can not be less than 3 characters long",
    }),

  Name_User: Joi.string()
    .min(7)
    .max(20)
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base":
        "The last  name can not contain numbers and special characters",
      "string.empty": "The last name can not be empty",
      "any.required": "The last name is required",
      "string.min": "The last name can not be less than 10 characters long",
    }),

  Email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email type",
    "string.empty": "Email field can not be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .max(16)
    .required()
    .regex(/^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{5,}$/)
    .messages({
      "string.pattern.base":
        "The password should have at least one capital letter and a number",
      "string.empty": "The password field can not be empty",
      "string.required": "The password field is required",
      "string.max": "Password can not exceed 16 characters",
    }),
});
export default userValidationSchema;