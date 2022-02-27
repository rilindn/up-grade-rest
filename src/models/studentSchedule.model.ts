import mongoose from 'mongoose'

var StudentScheduleSchema = new mongoose.Schema(
  {
    classroom: {},
    schedule: [
      {
        day: {},
        hours: [
          {
            order: {},
            subject: {},
            subjectId: {},
            class: {},
            startTime: {},
            endTime: {},
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    collection: 'studentsSchedule',
  },
)

export default mongoose.model('StudentSchedule', StudentScheduleSchema)
