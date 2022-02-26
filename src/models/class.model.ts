import mongoose from 'mongoose'

var ClassSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
    },
    classCapacity: {
      type: Number,
      required: true,
      trim: true,
    },
    parallels: [
      {
        parallel: { type: String },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'classes',
  },
)

export default mongoose.model('Class', ClassSchema)
