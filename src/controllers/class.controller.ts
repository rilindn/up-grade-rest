import ClassModel from '../models/class.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema, newClassParallel } from './../validators/class.validation'

const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await ClassModel.find()
    return res.send(classes)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getClassById = async (req: Request, res: Response) => {
  try {
    const clas = await ClassModel.find({ _id: req.params.id })
    return res.send(clas)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerClass = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  const newClass = new ClassModel({ ...req.body })
  try {
    await newClass.save()
    return res.send(newClass)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const addClassStudent = async (req: Request, res: Response) => {
  const classId = req.params.id
  const validationResult = newClassParallel.validate({ ...req.body, classId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  let classroom = await ClassModel.findById(classId)

  if (!classroom) res.status(404).send('Classroom not found!')
  try {
    classroom?.parallels.push(req.body)
    await classroom.save()
    res.send(classroom)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateClass = async (req: Request, res: Response) => {
  const classId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, classId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const updatedClass = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
  if (!updatedClass) res.status(404).send('Class not found!')
  try {
    await updatedClass.save()
    res.send(updatedClass)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteClass = async (req: Request, res: Response) => {
  try {
    const deletedClass = await ClassModel.findByIdAndDelete(req.params.id)
    if (!deletedClass) res.status(404).send('User not found!')
    res.status(200).send(deletedClass)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllClasses, getClassById, registerClass, addClassStudent, updateClass, deleteClass }
