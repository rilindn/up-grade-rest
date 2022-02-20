import Joi from 'joi'

export const registerSchema = Joi.object({
  subjectName: Joi.string().min(3).required().label('Name'),
  targetedLevel: Joi.number().min(1).max(12).required().label('Level'),
  subjectDescription: Joi.string().min(3).required().label('Description'),
})

export const updateSchema = Joi.object({
  subjectId: Joi.string().required().label('ID'),
  subjectName: Joi.string().min(3).label('Name'),
  targetedLevel: Joi.number().min(1).max(12).label('Level'),
  subjectDescription: Joi.string().min(3).label('Description'),
})
