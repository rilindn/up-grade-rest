import Joi from 'joi'

export const addGradeSchema = Joi.object({
  student: Joi.string().required().label('Student ID'),
  grade: Joi.array().items({
    course: Joi.object({
      teacher: Joi.string().required().label('Teacher name'),
      id: Joi.string().required().label('Subject ID'),
      subject: Joi.string().required().label('Subject name'),
    }),
    periods: Joi.object({
      '1': Joi.object({
        first: Joi.number().allow(null).min(1).max(5).required().label('First grade of first period'),
        second: Joi.number().allow(null).min(1).max(5).required().label('Second grade of first period'),
        final: Joi.number().allow(null).min(1).max(5).required().label('Final grade of first period '),
      }),
      '2': Joi.object({
        first: Joi.number().allow(null).min(1).max(5).required().label('First grade of second period'),
        second: Joi.number().allow(null).min(1).max(5).required().label('Second grade of second period'),
        final: Joi.number().allow(null).min(1).max(5).required().label('Final grade of second period '),
      }),
      '3': Joi.object({
        first: Joi.number().allow(null).min(1).max(5).required().label('First grade of third period'),
        second: Joi.number().allow(null).min(1).max(5).required().label('Second grade of third period'),
        final: Joi.number().allow(null).min(1).max(5).required().label('Final grade of third period '),
      }),
    }),
    final: Joi.number().allow(null).min(1).max(5).required().label('Final grade'),
  }),
})

export const updateSchema = Joi.object({
  gradeId: Joi.string().required().label('Grade ID'),
  course: Joi.object({
    teacher: Joi.string().required().label('Teacher name'),
    id: Joi.string().required().label('Subject ID'),
    subject: Joi.string().required().label('Subject name'),
  }),
  periods: Joi.object({
    '1': Joi.object({
      first: Joi.number().allow(null).min(1).max(5).label('First grade of first period'),
      second: Joi.number().allow(null).min(1).max(5).label('Second grade of first period'),
      final: Joi.number().allow(null).min(1).max(5).label('Final grade of first period '),
    }),
    '2': Joi.object({
      first: Joi.number().allow(null).min(1).max(5).label('First grade of second period'),
      second: Joi.number().allow(null).min(1).max(5).label('Second grade of second period'),
      final: Joi.number().allow(null).min(1).max(5).label('Final grade of second period '),
    }),
    '3': Joi.object({
      first: Joi.number().allow(null).min(1).max(5).label('First grade of third period'),
      second: Joi.number().allow(null).min(1).max(5).label('Second grade of third period'),
      final: Joi.number().allow(null).min(1).max(5).label('Final grade of third period '),
    }),
  }),
  final: Joi.number().allow(null).min(1).max(5).label('Final grade'),
})
