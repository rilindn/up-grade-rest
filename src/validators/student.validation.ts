import Joi from 'joi';
import { registerSchema, updateSchema } from './user.validation';

export const studentRegister = registerSchema.keys({
  studentId: Joi.number().required().label('Student ID'),
  parent: Joi.string().label('Parent name'),
});

export const studentUpdate = updateSchema.keys({
  studentId: Joi.number().label('Student ID'),
  parent: Joi.string().label('Parent name'),
});
