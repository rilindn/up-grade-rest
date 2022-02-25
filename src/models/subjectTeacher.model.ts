import mongoose from 'mongoose'

const SubjectTeacherSchema = new mongoose.Schema(
  {
    teacher: {
      name: { type: String },
      id: { type: String },
    },
    subject: {
      name: { type: String },
      id: { type: String },
    },
  },
  {
    timestamps: true,
    collection: 'subjectTeachers',
  },
)

export default mongoose.model('SubjectTeacher', SubjectTeacherSchema)
