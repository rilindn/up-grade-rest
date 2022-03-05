import Joi from 'joi'

export const registerSchema = Joi.object({
  teacher: Joi.object({
    name: Joi.string().required().label('Teacher name'),
    id: Joi.string().required().label('Teacher ID'),
  }),
  student: Joi.object({
    name: Joi.string().required().label('Student name'),
    id: Joi.string().required().label('Student ID'),
  }),
  description: Joi.string().required().label('Description'),
})

export const updateSchema = Joi.object({
  remarkId: Joi.string().required().label('Remark ID'),
  teacher: Joi.object({
    name: Joi.string().label('Teacher name'),
    id: Joi.string().label('Teacher ID'),
  }),
  student: Joi.object({
    name: Joi.string().label('Student name'),
    id: Joi.string().label('Student ID'),
  }),
  description: Joi.string().label('Description'),
})
