import Joi from 'joi'

export const addGradeSchema = Joi.object({
  student: Joi.string().required().label('Student ID'),
  grade: Joi.array().items({
    subject: Joi.object({
      teacher: Joi.string().required().label('Teacher name'),
      id: Joi.string().required().label('Subject ID'),
      name: Joi.string().required().label('Subject name'),
    }),
    periods: Joi.array().items({
      period: Joi.number().min(1).max(3).required().label('Period'),
      first: Joi.number().allow(null).min(1).max(5).required().label('First period grade'),
      second: Joi.number().allow(null).min(1).max(5).required().label('Second period grade'),
      final: Joi.number().allow(null).min(1).max(5).required().label('Final period grade'),
    }),
    final: Joi.number().min(1).max(5).required().label('Final grade'),
  }),
})

export const updateSchema = Joi.object({
  gradeId: Joi.string().required().label('Grade ID'),
  subject: Joi.object({
    teacher: Joi.string().required().label('Teacher name'),
    id: Joi.string().required().label('Subject ID'),
    name: Joi.string().required().label('Subject name'),
  }),
  periods: Joi.array().items({
    period: Joi.number().min(1).max(3).required().label('Period'),
    first: Joi.number().allow(null).min(1).max(5).required().label('First period grade'),
    second: Joi.number().allow(null).min(1).max(5).required().label('Second period grade'),
    final: Joi.number().allow(null).min(1).max(5).required().label('Final period grade'),
  }),
  final: Joi.number().min(1).max(5).required().label('Final grade'),
})
