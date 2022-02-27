import Joi from 'joi'

export const registerSchema = Joi.object({
  level: Joi.number().min(1).max(12).required().label('Level'),
  className: Joi.string().min(3).max(100).required().label('Classname'),
  classCapacity: Joi.number().min(2).max(30).required().label('Capacity'),
  parallels: Joi.array().items({
    parallel: Joi.string().required().label('Parallel ID'),
  }),
})

export const updateSchema = Joi.object({
  classId: Joi.string().required().label('ID'),
  level: Joi.number().min(1).max(12).label('Level'),
  className: Joi.string().min(3).max(100).label('Classname'),
  classCapacity: Joi.number().min(2).max(30).label('Capacity'),
  parallels: Joi.array().items({
    parallel: Joi.string().label('Parallel ID'),
  }),
})

export const newClassParallel = Joi.object({
  classId: Joi.string().required().label('ID'),
  parallel: Joi.string().required().label('Parallel ID'),
})
