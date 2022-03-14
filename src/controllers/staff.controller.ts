import { Request, Response } from 'express'
import { generateStaffEmail } from '../services/staff.service'
import { staffRegister, staffUpdate } from '../validators/staff.validation'
import Staff from '../models/staff.model'
import paginate from 'jw-paginate'

const getAllStaff = async (req: any, res: any) => {
  try {
    const staff: any = await Staff.find()
    return res.status(200).send(staff)
  } catch (error) {
    console.log(error)
  }
}

const getFilteredStaff = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const staff: any = await Staff.find({
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    })
    const pageSize = 7
    const pager = paginate(staff.length, page, pageSize)

    const pageOfItems = staff.slice(pager.startIndex, pager.endIndex + 1)

    return res.status(200).send({ pager, pageOfItems })
  } catch (error) {
    console.log(error)
  }
}

const getStaffById = async (req: Request, res: Response) => {
  try {
    const user = await Staff.find({ _id: req.params.id })
    return res.send(user)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerStaff = async (req: Request, res: Response) => {
  const email = await generateStaffEmail(req.body)
  const password = '12345678'

  const validationResult = staffRegister.validate({ ...req.body, email, password })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const newUser = new Staff({ ...req.body, email, password })
  try {
    await newUser.save()
    return res.send(newUser)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateStaff = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = staffUpdate.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedUser = await Staff.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
    if (!updatedUser) return res.status(404).send('User not found!')
    return res.send(updatedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteStaff = async (req: Request, res: Response) => {
  try {
    const deletedUser = await Staff.findByIdAndDelete(req.params.id)
    if (!deletedUser) res.status(404).send('User not found!')
    res.status(200).send(deletedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllStaff, getFilteredStaff, getStaffById, registerStaff, updateStaff, deleteStaff }
