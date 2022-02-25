import Joi from 'joi'

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().label('Firstname'),
  lastName: Joi.string().min(2).max(30).required().label('Lastname'),
  email: Joi.string().email().min(5).max(30).required().label('Email'),
  password: Joi.string().alphanum().min(7).max(30).required().label('Password'),
  dateOfBirth: Joi.string().required().label('Date of birth'),
  gender: Joi.string().required().label('Gender'),
})

export const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  email: Joi.string().email().min(5).max(30).label('Email'),
  password: Joi.string().alphanum().min(7).max(30).label('Password'),
  dateOfBirth: Joi.string().label('Date of birth'),
  gender: Joi.string().label('Gender'),
})
