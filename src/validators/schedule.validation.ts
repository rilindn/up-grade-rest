import Joi from 'joi'

export const registerSchema = Joi.object({
  parallel: Joi.string().required().label('Parallel ID'),
  days: Joi.array().items({
    day: Joi.string().required().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday').label('Day'),
  }),
})

export const addScheduleHourSchema = Joi.object({
  parallel: Joi.string().required().label('Parallel ID'),
  day: Joi.string().required().label('Day'),
  hours: Joi.array().items({
    teacher: Joi.string().required().label('Teacher'),
    teacherId: Joi.string().required().label('Teacher ID'),
    course: Joi.string().required().label('Course'),
    courseCode: Joi.string().required().label('Course code'),
    courseId: Joi.string().required().label('Course ID'),
    classroom: Joi.string().required().label('Classroom'),
    startTime: Joi.string().required().label('Start time'),
    endTime: Joi.string().required().label('End time'),
  }),
})

export const updateScheduleHourSchema = Joi.object({
  parallel: Joi.string().required().label('Parallel ID'),
  day: Joi.string().required().label('Day'),
  course: Joi.string().required().label('Course'),
  hours: Joi.object({
    teacher: Joi.string().required().label('Teacher'),
    teacherId: Joi.string().required().label('Teacher ID'),
    course: Joi.string().required().label('Course'),
    courseCode: Joi.string().required().label('Course code'),
    courseId: Joi.string().required().label('Course ID'),
    classroom: Joi.string().required().label('Classroom'),
    startTime: Joi.string().required().label('Start time'),
    endTime: Joi.string().required().label('End time'),
  }),
})

export const deleteScheduleHourSchema = Joi.object({
  parallel: Joi.string().required().label('Parallel ID'),
  day: Joi.string().required().label('Day'),
  hourId: Joi.string().required().label('Hour ID'),
})
