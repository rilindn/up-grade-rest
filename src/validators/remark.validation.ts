import Joi from 'joi'

export const registerSchema = Joi.object({
    teacher: Joi.object({
      name: Joi.string().required().label('Teacher name'),
    }),
    remark: Joi.object({
      description: Joi.string().required().label('Description'),
    }),
  })

  export const updateSchema = Joi.object({
    teacher: Joi.object({
        name: Joi.string().required().label('Teacher name'),
      }),
      remark: Joi.object({
        description: Joi.string().required().label('Description'),
      }),
  })