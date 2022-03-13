import Joi from 'joi'

export const registerSchema = Joi.object({
  teacher: Joi.object({
    id: Joi.string().required().label('Teacher ID'),
    name: Joi.string().required().label('Teacher name'),
  }),
  subject: Joi.object({
    id: Joi.string().required().label('Subject ID'),
    name: Joi.string().required().label('Subject name'),
  }),
  courseCode: Joi.string().required().label('Course code'),
})

export const updateSchema = Joi.object({
  courseId: Joi.string().required().label('Course ID'),
  teacher: Joi.object({
    id: Joi.string().label('Teacher ID'),
    name: Joi.string().label('Teacher name'),
  }),
  subject: Joi.object({
    id: Joi.string().label('Subject ID'),
    name: Joi.string().label('Subject name'),
  }),
  courseCode: Joi.string().label('Course code'),
})
