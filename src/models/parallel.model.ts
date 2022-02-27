import mongoose from 'mongoose'

var ParallelSchema = new mongoose.Schema(
  {
    class: { type: String },
    name: { type: String },
    capacity: { type: Number },
    students: [
      {
        student: { type: String },
        _id: false,
      },
    ],
    courses: [
      {
        course: { type: String },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'parallels',
  },
)

export default mongoose.model('Parallel', ParallelSchema)
