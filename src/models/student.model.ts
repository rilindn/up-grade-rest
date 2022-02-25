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
      phoneNumber: { type: Number, required: true },
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
      required: true,
      trim: true,
    },
    zipCode: {
      type: Number,
      required: true,
      trim: true,
    },
    personalEmail: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      trim: true,
    },
  }),
)

export default Student
