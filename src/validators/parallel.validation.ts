import Joi from 'joi'

export const registerSchema = Joi.object({
  class: Joi.string().required().label('Class'),
  name: Joi.string().required().label('Name'),
  capacity: Joi.number().min(2).max(40).required().label('Capacity'),
  students: Joi.array().items({
    student: Joi.string().required().label('Student ID'),
  }),
  subjectTeachers: Joi.array().items({
    subjectTeacher: Joi.string().required().label('Teacher ID'),
  }),
})

export const updateSchema = Joi.object({
  parallelId: Joi.string().required().label('ID'),
  class: Joi.string().label('Class'),
  name: Joi.string().label('Name'),
  capacity: Joi.number().min(2).max(40).label('Capacity'),
  students: Joi.array().items({
    student: Joi.string().label('Student ID'),
  }),
  subjectTeachers: Joi.array().items({
    subjectTeacher: Joi.string().label('Teacher ID'),
  }),
})

export const newClassStudent = Joi.object({
  parallelId: Joi.string().required().label('ID'),
  student: Joi.string().required().label('Student ID'),
})
