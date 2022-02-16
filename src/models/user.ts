import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var UserSchema = new mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Student', 'Staff', 'Admin'],
      required: true,
      default: 'Student',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.virtual('fullName').get(function (this: any) {
  return this.firstName + ' ' + this.lastName;
});

export default mongoose.model('User', UserSchema);
