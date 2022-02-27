import ParallelModel from '../models/parallel.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema, newClassStudent } from '../validators/parallel.validation'
import Student from '../models/student.model'
import ClassModel from '../models/class.model'

const getAllParallels = async (req: Request, res: Response) => {
  try {
    const parallels = await ParallelModel.find()
    return res.send(parallels)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getParallelById = async (req: Request, res: Response) => {
  try {
    const parallel = await ParallelModel.find({ _id: req.params.id })
    return res.send(parallel)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getNonAssignedParallels = async (req: Request, res: Response) => {
  let classes = await ClassModel.find()
  let parallels = await ParallelModel.find()

  if (!parallels) res.status(404).send('Parallels not found!')
  if (!classes) res.status(404).send('Classes not found!')

  try {
    let classParallels = classes
      ?.map(({ parallels }: any) => {
        return parallels?.map(({ parallel }: any) => parallel)
      })
      .flat(5)
    const result = parallels?.filter(({ _id }: any) => !classParallels?.includes(_id.toString()))
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getParallelStudents = async (req: Request, res: Response) => {
  const parallelId = req.params.id

  let parallel = await ParallelModel.findById(parallelId)

  if (!parallel) res.status(404).send('Parallel not found!')

  try {
    Promise.all(
      parallel?.students.map(({ student }: any) => {
        return Student.findById(student)
      }),
    ).then((students) => {
      res.send(students)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const registerParallel = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  const newParallel = new ParallelModel({ ...req.body })
  try {
    await newParallel.save()
    return res.send(newParallel)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateParallel = async (req: Request, res: Response) => {
  const parallelId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, parallelId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const updatedParallel = await ParallelModel.findByIdAndUpdate(parallelId, req.body, { returnOriginal: false })
  if (!updatedParallel) res.status(404).send('Class not found!')
  try {
    await updatedParallel.save()
    res.send(updatedParallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

const addClassStudent = async (req: Request, res: Response) => {
  const parallelId = req.params.id
  const validationResult = newClassStudent.validate({ ...req.body, parallelId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  let parallel = await ParallelModel.findById(parallelId)

  if (!parallel) res.status(404).send('Parallel not found!')
  try {
    parallel?.students.push(req.body)
    await parallel.save()
    res.send(parallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteStudentParallel = async (req: Request, res: Response) => {
  const { parallelId, studentId } = req.body

  let parallel = await ParallelModel.findById(parallelId)

  if (!parallel) res.status(404).send('Parallel not found!')
  try {
    console.log(parallel)
    const result = parallel?.students.filter(({ student }: any) => {
      return student != studentId
    })
    console.log('result', result)

    parallel.students = result
    await parallel.save()
    res.send(parallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteParallel = async (req: Request, res: Response) => {
  try {
    const deletedClass = await ParallelModel.findByIdAndDelete(req.params.id)
    if (!deletedClass) res.status(404).send('User not found!')
    res.status(200).send(deletedClass)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  getAllParallels,
  getParallelById,
  getParallelStudents,
  getNonAssignedParallels,
  deleteStudentParallel,
  registerParallel,
  addClassStudent,
  updateParallel,
  deleteParallel,
}
