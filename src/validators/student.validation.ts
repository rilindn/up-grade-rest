import Joi from 'joi'
import { registerSchema, updateSchema } from './user.validation'

export const studentRegister = registerSchema.keys({
  studentId: Joi.number().required().label('Student ID'),
  parent: Joi.object({
    firstName: Joi.string().required().label('Parent name'),
    phoneNumber: Joi.number().label('Parent Number'),
  }),
  enrolledYear: Joi.number().required().label('Enrolled Year'),
  nationality: Joi.string().required().label('Nationality'),
  citizenship: Joi.string().required().label('Citizenship'),
  place: Joi.string().label('Place'),
  zipCode: Joi.number().label('Zipcode'),
  personalEmail: Joi.string().label('Personal email'),
  profilePictureUrl: Joi.string().label('Profile picture'),
})

export const studentUpdate = updateSchema.keys({
  studentId: Joi.number().label('Student ID'),
  parent: Joi.object({
    firstName: Joi.string().label('Parent name'),
    phoneNumber: Joi.number().label('Parent Number'),
  }),
  enrolledYear: Joi.number().label('Enrolled Year'),
  nationality: Joi.string().label('Nationality'),
  citizenship: Joi.string().label('Citizenship'),
  place: Joi.string().label('Place'),
  zipCode: Joi.number().label('Zipcode'),
  personalEmail: Joi.string().label('Personal email'),
  profilePictureUrl: Joi.string().label('Profile picture'),
})
