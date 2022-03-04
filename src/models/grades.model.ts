import mongoose from 'mongoose'

var GradesSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      index: true,
      unique: true,
    },
    grade: [
      {
        course: {
          teacher: { type: String },
          id: { type: String, index: true, unique: true },
          subject: { type: String },
        },
        periods: {
          '1': {
            first: { type: Number, default: null },
            second: { type: Number, default: null },
            final: { type: Number, default: null },
            _id: false,
          },
          '2': {
            first: { type: Number, default: null },
            second: { type: Number, default: null },
            final: { type: Number, default: null },
            _id: false,
          },
          '3': {
            first: { type: Number, default: null },
            second: { type: Number, default: null },
            final: { type: Number, default: null },
            _id: false,
          },
        },
        final: { type: Number, default: null },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'grades',
  },
)

export default mongoose.model('Grades', GradesSchema)
