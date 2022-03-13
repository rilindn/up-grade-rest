import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema(
  {
    teacher: {
      name: { type: String },
      id: { type: String },
    },
    subject: {
      name: { type: String },
      id: { type: String },
    },
    courseCode: { type: String },
  },
  {
    timestamps: true,
    collection: 'courses',
  },
)

export default mongoose.model('Course', CourseSchema)
