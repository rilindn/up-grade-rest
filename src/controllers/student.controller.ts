import { Request, Response } from 'express'
import { generateStudentId, generateStudentEmail } from '../services/student.service'
import { studentRegister, studentUpdate } from './../validators/student.validation'
import Student from '../models/student.model'
import paginate from 'jw-paginate'
import ParallelModel from '../models/parallel.model'

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find()
    return res.send(students)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getFilteredUsers = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const items: any = await Student.find({
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
      ],
    })
    const pageSize = 7
    const pager = paginate(items.length, page, pageSize)

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

    return res.status(200).send({ pager, pageOfItems })
  } catch (error) {
    console.log(error)
  }
}

const getNonAssignedStudents = async (req: Request, res: Response) => {
  let parallels = await ParallelModel.find()
  let students = await Student.find()

  if (!parallels) res.status(404).send('Parallels not found!')
  if (!students) res.status(404).send('Students not found!')

  try {
    let parallelStudents = parallels
      ?.map(({ students }: any) => {
        return students?.map(({ student }: any) => student)
      })
      .flat(5)
    const result = students?.filter(({ _id }: any) => !parallelStudents?.includes(_id.toString()))
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.find({ _id: req.params.id })
    return res.send(student)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerStudent = async (req: Request, res: Response) => {
  const studentId = await generateStudentId()
  const email = generateStudentEmail(studentId, req.body)
  const password = '12345678'

  const validationResult = studentRegister.validate({ ...req.body, studentId, email, password })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const newUser = new Student({ ...req.body, studentId, email, password })
  try {
    await newUser.save()
    return res.send(newUser)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateStudent = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = studentUpdate.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error
    return res.status(400).json({ error: errorMsg })
  }
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
    if (!updatedStudent) return res.status(404).send('User not found!')
    return res.send(updatedStudent)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)
    if (!deletedStudent) res.status(404).send('User not found!')
    res.status(200).send(deletedStudent)
  } catch (error) {
    res.status(500).send(error)
  }
}

const countStudentsByGender = async (req: Request, res: Response) => {
  const female = await Student.countDocuments({ gender: 'Female' })
  const male = await Student.countDocuments({ gender: 'Male' })
  res.status(200).json({ female, male })
}

export default {
  getAllStudents,
  getFilteredUsers,
  getNonAssignedStudents,
  getStudentById,
  registerStudent,
  updateStudent,
  deleteStudent,
  countStudentsByGender,
}
