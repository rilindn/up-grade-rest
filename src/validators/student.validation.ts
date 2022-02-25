import Joi from 'joi'
import { registerSchema, updateSchema } from './user.validation'

export const studentRegister = registerSchema.keys({
  studentId: Joi.number().required().label('Student ID'),
  parent: Joi.object({
    firstName: Joi.string().required().label('Parent name'),
    phoneNumber: Joi.number().required().label('Parent Number'),
  }),
  enrolledYear: Joi.number().required().label('Enrolled Year'),
  nationality: Joi.string().required().label('Nationality'),
  citizenship: Joi.string().required().label('Citizenship'),
  place: Joi.string().required().label('Place'),
  zipCode: Joi.number().required().label('Zipcode'),
  personalEmail: Joi.string().required().label('Personal email'),
  status: Joi.boolean().required().label('Status'),
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
  status: Joi.boolean().label('Status'),
})
