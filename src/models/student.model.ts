import mongoose from 'mongoose';
import User from './user.model';

const Student = User.discriminator(
  'Student',
  new mongoose.Schema({
    studentId: {
      type: Number,
      required: true,
      trim: true,
    },
    parent: {
      type: String,
      trim: true,
    },
  }),
);

export default Student;