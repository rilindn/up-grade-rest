import mongoose from 'mongoose';
import User from './user.model';

const Staff = User.discriminator(
  'Staff',
  new mongoose.Schema({
    degree: {
      type: String,
      trim: true,
    },
  }),
);

export default Staff;
