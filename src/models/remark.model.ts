import mongoose from 'mongoose'

const RemarkSchema = new mongoose.Schema(
  {
    teacher: {
      name: { type: String },
      id: { type: String },
    },
    student: {
      name: { type: String },
      id: { type: String },
    },
    description: { type: String },
  },
  {
    timestamps: true,
    collection: 'remarks',
  },
)

export default mongoose.model('Remark', RemarkSchema)
