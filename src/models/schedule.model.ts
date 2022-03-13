import mongoose from 'mongoose'

var Schedule = new mongoose.Schema(
  {
    parallel: { type: String, unique: true },
    days: [
      {
        day: { type: String },
        hours: [
          {
            teacher: { type: String },
            teacherId: { type: String },
            course: { type: String },
            courseCode: { type: String },
            courseId: { type: String },
            classroom: { type: String },
            startTime: { type: String },
            endTime: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    collection: 'schedules',
  },
)

export default mongoose.model('Schedule', Schedule)
