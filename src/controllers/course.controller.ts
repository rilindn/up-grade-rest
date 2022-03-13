import Course from '../models/course.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema } from '../validators/course.validation'
import ParallelModel from '../models/parallel.model'

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const search = req.query.search || ''
    const courses: any = await Course.find({
      $or: [
        { courseCode: { $regex: search, $options: 'i' } },
        { 'teacher.name': { $regex: search, $options: 'i' } },
        { 'subject.name': { $regex: search, $options: 'i' } },
      ],
    })
    return res.send(courses)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.find({ _id: req.params.id })
    return res.send(course)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getCourseByTeacherId = async (req: Request, res: Response) => {
  try {
    const course = await Course.find({ 'teacher.id': req.params.id })
    return res.send(course)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getParallelNonAssignedCourses = async (req: Request, res: Response) => {
  const parallelId = req.params.parallelId
  let parallel = await ParallelModel.findById(parallelId)
  let courses = await Course.find()

  if (!parallel) res.status(404).send('Parallel not found!')
  if (!courses) res.status(404).send('Courses not found!')

  try {
    let parallelCourses = parallel?.courses?.map(({ course }: any) => course).flat(5)
    const result = courses?.filter(({ _id }: any) => !parallelCourses?.includes(_id.toString()))
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const registerCourse = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  const newCourse = new Course({ ...req.body })
  try {
    await newCourse.save()
    return res.send(newCourse)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateCourse = async (req: Request, res: Response) => {
  const courseId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, courseId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { returnOriginal: false })
  if (!updatedCourse) res.status(404).send('Course not found!')
  try {
    await updatedCourse.save()
    res.send(updatedCourse)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id)
    if (!deletedCourse) res.status(404).send('Subject not found!')
    res.status(200).send(deletedCourse)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllCourses, getCourseById, getCourseByTeacherId, getParallelNonAssignedCourses, registerCourse, updateCourse, deleteCourse }
