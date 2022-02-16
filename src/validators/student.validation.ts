import Joi from 'joi';

export const registerSchema = Joi.object({
  studentId: Joi.number().required().label('Student ID'),
  firstName: Joi.string().min(2).max(30).required().label('Firstname'),
  lastName: Joi.string().min(2).max(30).required().label('Lastname'),
  email: Joi.string().email().min(5).max(30).required().label('Email'),
  password: Joi.string().alphanum().min(7).max(30).required().label('Password'),
  role: Joi.string().valid('Student', 'Staff', 'Admin').required().label('Role'),
});

export const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  studentId: Joi.number().label('Student ID'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  email: Joi.string().email().min(5).max(30).label('Email'),
  password: Joi.string().alphanum().min(7).max(30).label('Password'),
  role: Joi.string().valid('Student', 'Staff', 'Admin').label('Role'),
});
