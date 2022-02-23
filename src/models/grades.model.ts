import mongoose from 'mongoose'

var GradesSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      index: true,
    },
    grade: [
      {
        subject: {
          teacher: { type: String },
          id: { type: String },
          name: { type: String, index: true },
        },
        periods: [
          {
            period: { type: Number },
            first: { type: Number },
            second: { type: Number },
            final: { type: Number },
            _id: false,
          },
        ],
        final: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'grades',
  },
)

export default mongoose.model('Grades', GradesSchema)
