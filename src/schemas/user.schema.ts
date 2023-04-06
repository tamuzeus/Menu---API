import Joi from 'joi';

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();

export const userSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
