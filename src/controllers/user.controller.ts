import { Request, Response } from 'express'
import { updateLangSchema, updateAvatarColor, updatePassword } from '../validators/user.validation'
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import { measureMemory } from 'vm'
import studentScheduleModel from '../models/studentSchedule.model'

const changeLanguage = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updateLangSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
    if (!updatedUser) return res.status(404).send('User not found!')
    return res.send(updatedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

const changeAvatarColor = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updateAvatarColor.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
    if (!updatedUser) return res.status(404).send('User not found!')
    return res.send(updatedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

const changePassword = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updatePassword.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const user = await User.findById(userId).select('+password')
    bcrypt.compare(req.body.currentPassword, user.password, async (error, data) => {
      if (error) return res.status(500).send(error)
      if (data) {
        user.password = req.body.newPassword
        await user.save()
        return res.send(user)
      } else {
        return res.status(401).send('Current password is incorrect!')
      }
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
export default { changeLanguage, changeAvatarColor, changePassword }
