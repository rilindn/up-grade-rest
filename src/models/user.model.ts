import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
    discriminatorKey: 'role',
  },
)

UserSchema.pre('save', async function (next) {
  const hashedPsw = await bcrypt.hash(this.password, 10)
  this.password = hashedPsw
  next()
})

UserSchema.virtual('fullName').get(function (this: any) {
  return this.firstName + ' ' + this.lastName
})

export default mongoose.model('User', UserSchema)
