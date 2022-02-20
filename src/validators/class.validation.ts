import Joi from 'joi';

export const registerSchema = Joi.object({
  level: Joi.number().min(1).max(12).required().label('Level'),
  className: Joi.string().min(3).max(100).required().label('Classname'),
  classCapacity: Joi.number().min(2).max(30).required().label('Classcapacity'),
});

export const updateSchema = Joi.object({
  classId: Joi.string().required().label('ID'),
  level: Joi.number().min(1).max(12).label('Level'),
  className: Joi.string().min(3).max(100).label('Classname'),
  classCapacity: Joi.number().min(2).max(30).label('Classcapacity'),
});
