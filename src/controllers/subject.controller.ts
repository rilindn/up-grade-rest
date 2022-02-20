import SubjectModel from '../models/subject.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema } from '../validators/subject.validation'

const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await SubjectModel.find()
    return res.send(subjects)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject = await SubjectModel.find({ _id: req.params.id })
    return res.send(subject)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerSubject = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  const newSubject = new SubjectModel({ ...req.body })
  try {
    await newSubject.save()
    return res.send(newSubject)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateSubject = async (req: Request, res: Response) => {
  const subjectId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, subjectId })

  if (validationResult.error) {
    const errorMsg = validationResult.error
    return res.status(400).json({ error: errorMsg })
  }

  const updatedSubject = await SubjectModel.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
  if (!updatedSubject) res.status(404).send('Subject not found!')
  try {
    await updatedSubject.save()
    res.send(updatedSubject)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteSubject = async (req: Request, res: Response) => {
  try {
    const deletedSubject = await SubjectModel.findByIdAndDelete(req.params.id)
    if (!deletedSubject) res.status(404).send('Subject not found!')
    res.status(200).send(deletedSubject)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllSubjects, getSubjectById, registerSubject, updateSubject, deleteSubject }
