import { Request, Response } from 'express'
import { registerSchema, updateSchema } from '../validators/user.validation'
import Admin from '../models/admin.model'
import Staff from '../models/staff.model'
import { generateStaffEmail } from '../services/staff.service'
import { staffRegister } from '../validators/staff.validation'

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.find()
    return res.send(admin)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getAdminById = async (req: Request, res: Response) => {
  try {
    const user = await Admin.find({ _id: req.params.id })
    return res.send(user)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerAdmin = async (req: Request, res: Response) => {
  const email = await generateStaffEmail(req.body)
  const password = '12345678'

  const validationResult = staffRegister.validate({ ...req.body, email, password })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const newAdmin = new Admin({ ...req.body, email, password })
  try {
    await newAdmin.save()
    return res.send(newAdmin)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateAdmin = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedUser = await Admin.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
    if (!updatedUser) return res.status(404).send('User not found!')
    return res.send(updatedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const deletedUser = await Admin.findByIdAndDelete(req.params.id)
    if (!deletedUser) res.status(404).send('User not found!')
    res.status(200).send(deletedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllAdmins, getAdminById, registerAdmin, updateAdmin, deleteAdmin }
