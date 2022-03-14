import mongoose from 'mongoose'
import User from './user.model'

const Student = User.discriminator(
  'Student',
  new mongoose.Schema({
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    parent: {
      firstName: { type: String, required: true },
      phoneNumber: { type: Number },
    },
    enrolledYear: {
      type: Number,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    citizenship: {
      type: String,
      required: true,
      trim: true,
    },
    place: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: Number,
      trim: true,
    },
    personalEmail: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      trim: true,
      default: true,
    },
    profilePictureUrl: {
      type: String,
    },
  }),
)

export default Student
