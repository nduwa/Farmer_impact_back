import Joi from "joi";
const loginValidationSchema = Joi.object({
  Name_User: Joi.string().required().messages({
    "string.empty": "user name is required",

  }),

  password: Joi.required().messages({
    "string.empty": "The password field can not be empty",
    "string.required": "The password field is required",
  }),
});
export default loginValidationSchema;
