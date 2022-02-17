import Joi from 'joi';
import { registerSchema, updateSchema } from './user.validation';

export const staffRegister = registerSchema.keys({
  degree: Joi.string().label('Degree'),
});

export const staffUpdate = updateSchema.keys({
  degree: Joi.string().label('Degree'),
});
