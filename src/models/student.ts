import mongoose from 'mongoose';

var StudentSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
    collection: 'students',
  },
);

StudentSchema.virtual('fullName').get(function (this: any) {
  return this.firstName + ' ' + this.lastName;
});

export default mongoose.model('Student', StudentSchema);
