import SubjectTeacher from '../models/subjectTeacher.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema } from '../validators/subjectTeacher.validation'

const getAllSubjectTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await SubjectTeacher.find()
    return res.send(teachers)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getSubjectTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await SubjectTeacher.find({ _id: req.params.id })
    return res.send(teacher)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerSubjectTeacher = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  const newSubjectTeacher = new SubjectTeacher({ ...req.body })
  try {
    await newSubjectTeacher.save()
    return res.send(newSubjectTeacher)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateSubjectTeacher = async (req: Request, res: Response) => {
  const subjectTeacherId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, subjectTeacherId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const updatedSubjectTeacher = await SubjectTeacher.findByIdAndUpdate(subjectTeacherId, req.body, { returnOriginal: false })
  if (!updatedSubjectTeacher) res.status(404).send('Subject not found!')
  try {
    await updatedSubjectTeacher.save()
    res.send(updatedSubjectTeacher)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteSubjectTeacher = async (req: Request, res: Response) => {
  try {
    const deletedSubjectTeacher = await SubjectTeacher.findByIdAndDelete(req.params.id)
    if (!deletedSubjectTeacher) res.status(404).send('Subject not found!')
    res.status(200).send(deletedSubjectTeacher)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllSubjectTeachers, getSubjectTeacherById, registerSubjectTeacher, updateSubjectTeacher, deleteSubjectTeacher }
