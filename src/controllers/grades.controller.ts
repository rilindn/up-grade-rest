import Grades from '../models/grades.model'
import { Request, Response } from 'express'
import { addGradeSchema, updateSchema } from '../validators/grades.validation'
import Course from '../models/course.model'

const getStudentGrades = async (req: Request, res: Response) => {
  const student = req.params.studentId
  const courseId = req.params.courseId
  try {
    let grades: any = await Grades.findOne({ student })
    if (courseId) {
      grades = grades?.grade?.find(({ course }: any) => course?.id === courseId)
    }
    return res.send(grades)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getStudentsGPA = async (req: Request, res: Response) => {
  const student = req.params.studentId
  let gradesSum = 0
  let gradesCount = 0
  let average = 0
  try {
    let grades: any = await Grades.findOne({ student })
    grades?.grade?.map(({ final }: any) => {
      console.log('ttt', final)
      if (final) {
        gradesSum += final
        gradesCount++
      }
    })
    if (gradesCount > 0) average = gradesSum / gradesCount
    return res.json(average.toFixed(2))
  } catch (error) {
    return res.status(500).send(error)
  }
}

const addGrade = async (req: Request, res: Response) => {
  const validationResult = addGradeSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(403).send({ error: errorMsg })
  }
  const newGrade = new Grades({ ...req.body })
  try {
    await newGrade.save()
    return res.send(newGrade)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateGrades = async (req: Request, res: Response) => {
  let gradeId = req.params.id
  let grades: any = {}
  const validationResult = updateSchema.validate({ ...req.body.gradesPayload, gradeId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }

  const setGrades = async (gradesData: any, { isNew }: any) => {
    gradesData?.grade?.map((item: any) => {
      if (isNew || item._id.toString() === gradeId?.toString()) {
        let periodsData = req.body?.gradesPayload?.periods
        if (periodsData) {
          Object.keys(periodsData).map((key: any): any => {
            if (periodsData[key]) item.periods[key] = periodsData[key]
          })
        }
        if (req.body?.gradesPayload?.final) {
          Object.keys(item.periods).map((key: any): any => {
            if (!item.periods[key].final) {
              return res.status(401).send('Must set all final grades for periods firstly!')
            }
          })
          item.final = req.body?.gradesPayload?.final
        }
      }
    })
    await gradesData.save()
    return res.send(gradesData)
  }
  try {
    if (gradeId === 'undefined') {
      const course = await Course.findById(req.body.ids.courseId)

      const courseData = {
        teacher: course?.teacher?.name,
        id: course?._id,
        subject: course?.subject?.name,
      }

      grades = await Grades.findOne({ student: req.body.ids?.studentId })
      gradeId = grades.grade?.[0]?._id
      grades?.grade.push({ course: courseData })

      return await setGrades(grades, { isNew: true })
    } else {
      grades = await Grades.findOne({ 'grade._id': gradeId })
      if (!grades) return res.status(404).send('Grades not found!')
      return await setGrades(grades, { isNew: false })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getStudentGrades, getStudentsGPA, addGrade, updateGrades }
