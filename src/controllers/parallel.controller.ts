import ParallelModel from '../models/parallel.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema, newClassStudent, newClassCourse } from '../validators/parallel.validation'
import Student from '../models/student.model'
import ClassModel from '../models/class.model'
import Course from '../models/course.model'
import Grades from '../models/grades.model'
import Schedule from '../models/schedule.model'
import { defaultDays } from '../services/schedule.service'

const getAllParallels = async (req: Request, res: Response) => {
  try {
    const search = req.query.search || ''
    const parallels: any = await ParallelModel.find({
      $or: [{ name: { $regex: search, $options: 'i' } }, { class: { $regex: search, $options: 'i' } }],
    })
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
    const students = await Promise.all(
      parallel?.students.map(({ student }: any) => {
        return Student.findById(student)
      }),
    )
    return res.send(students.filter(Boolean))
  } catch (error) {
    res.status(500).send(error)
  }
}

const getParallelCourses = async (req: Request, res: Response) => {
  const parallelId = req.params.id

  let parallel = await ParallelModel.findById(parallelId)

  if (!parallel) res.status(404).send('Parallel not found!')

  try {
    Promise.all(
      parallel?.courses.map(({ course }: any) => {
        return Course.findById(course)
      }),
    ).then((students) => {
      res.send(students)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const getTeacherParallels = async (req: Request, res: Response) => {
  const teacherId = req.params.id
  let parallels = await ParallelModel.find()

  if (!parallels) res.status(404).send('Parallels not found!')

  try {
    const matchParallel = async (parallel: any) => {
      return parallel?.courses?.some(async ({ course }: any) => {
        const resultCourse: any = await Course.findById(course)
        return resultCourse?.teacher?.id === teacherId
      })
    }
    const resultedParallels = await Promise.all(
      parallels?.map(async (parallel: any) => {
        const isMatched = await matchParallel(parallel)
        if (isMatched) return parallel
      }),
    )
    return res.send(resultedParallels.flat(5).filter(Boolean))
  } catch (error) {
    res.status(500).send(error)
  }
}

const getTeacherParallelCourses = async (req: Request, res: Response) => {
  const teacherId = req.params.teacherId
  const parallelId = req.params.parallelId

  let parallel: any = await ParallelModel.findById(parallelId)
  if (!parallel) res.status(404).send('Parallel not found!')

  try {
    const matchedParallel: any = await Promise.all(
      parallel?.courses?.map(async ({ course }: any) => {
        const resultCourse: any = await Course.findById(course)
        if (resultCourse?.teacher?.id === teacherId) return resultCourse
      }),
    )
    return res.send(matchedParallel.filter(Boolean))
  } catch (error) {
    res.status(500).send(error)
  }
}

const registerParallel = async (req: Request, res: Response) => {
  const days = defaultDays()
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  const newParallel = new ParallelModel({ ...req.body })
  try {
    await newParallel.save()
    const newParallelSchedule = new Schedule({ parallel: newParallel._id, days })
    await newParallelSchedule.save()
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
  const studentGrades = { student: req.body.student, grade: [] }
  let parallel = await ParallelModel.findById(parallelId)
  if (!parallel) res.status(404).send('Parallel not found!')
  const newGrades = new Grades({ ...studentGrades })

  try {
    parallel?.students.push(req.body)
    await parallel.save()
    await newGrades.save()
    res.send(parallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

const addClassCourse = async (req: Request, res: Response) => {
  const parallelId = req.params.id
  const validationResult = newClassCourse.validate({ ...req.body, parallelId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  let parallel = await ParallelModel.findById(parallelId)

  if (!parallel) res.status(404).send('Parallel not found!')
  try {
    parallel?.courses.push(req.body)
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
    const result = parallel?.students.filter(({ student }: any) => {
      return student != studentId
    })
    parallel.students = result
    await parallel.save()
    res.send(parallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteParallelCourse = async (req: Request, res: Response) => {
  const { parallelId, courseId } = req.body

  let parallel = await ParallelModel.findById(parallelId)

  if (!parallel) res.status(404).send('Parallel not found!')
  try {
    const result = parallel?.courses.filter(({ course }: any) => {
      return course != courseId
    })
    parallel.courses = result
    await parallel.save()
    res.send(parallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteParallel = async (req: Request, res: Response) => {
  try {
    const deletedParallel = await ParallelModel.findByIdAndDelete(req.params.id)
    if (!deletedParallel) res.status(404).send('Parallel not found!')
    await Schedule.deleteOne({ parallel: deletedParallel._id })
    res.status(200).send(deletedParallel)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  getAllParallels,
  getParallelById,
  getParallelStudents,
  getNonAssignedParallels,
  getParallelCourses,
  getTeacherParallelCourses,
  getTeacherParallels,
  addClassCourse,
  deleteStudentParallel,
  deleteParallelCourse,
  registerParallel,
  addClassStudent,
  updateParallel,
  deleteParallel,
}
