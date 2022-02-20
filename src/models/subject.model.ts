import mongoose from 'mongoose'

var SubjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    targetedLevel: {
      type: Number,
      required: true,
      trim: true,
    },
    subjectDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'subjects',
  },
)

export default mongoose.model('Subject', SubjectSchema)
