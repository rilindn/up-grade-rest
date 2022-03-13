import { query } from 'express'
import Joi from 'joi'

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().label('Firstname'),
  lastName: Joi.string().min(2).max(30).required().label('Lastname'),
  email: Joi.string().email().min(5).max(30).required().label('Email'),
  password: Joi.string().alphanum().min(7).max(30).required().label('Password'),
  dateOfBirth: Joi.string().required().label('Date of birth'),
  gender: Joi.string().required().label('Gender'),
})

export const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  email: Joi.string().email().min(5).max(30).label('Email'),
  password: Joi.string().alphanum().min(7).max(30).label('Password'),
  dateOfBirth: Joi.string().label('Date of birth'),
  gender: Joi.string().label('Gender'),
})

export const updateLangSchema = Joi.object({
  userId: Joi.string().required().label('User Id'),
  language: Joi.string().valid('en', 'al').required().label('Language'),
})

export const updateAvatarColor = Joi.object({
  userId: Joi.string().required().label('User Id'),
  avatarColor: Joi.string().required().label('Avatar'),
})

export const updatePassword = Joi.object({
  userId: Joi.string().required().label('User Id'),
  newPassword: Joi.string().required().min(8).label('New Password'),
  currentPassword: Joi.string().required().min(8).label('Current Password'),
})
