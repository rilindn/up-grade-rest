import Grades from '../models/grades.model'
import { Request, Response } from 'express'
import { addGradeSchema, updateSchema } from '../validators/grades.validation'

const getAllGrades = async (req: Request, res: Response) => {
  const student = req.params.id
  const subjectOnly = req.query.subject
  try {
    let grades: any = await Grades.findOne({ student })
    if (subjectOnly) {
      grades = grades?.grade?.find(({ subject }: any) => (subject.name = subjectOnly))
    }
    return res.send(grades)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const addGrade = async (req: Request, res: Response) => {
  const validationResult = addGradeSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
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
  const gradeId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, gradeId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).json({ error: errorMsg })
  }
  let grades = await Grades.findOne({ 'grade._id': gradeId })

  if (!grades) res.status(404).send('Grade not found!')
  try {
    grades?.grade?.map((item: any) => {
      if (item._id.toString() === gradeId) {
        item.periods = req.body.periods
        item.final = req.body.final
      }
    })
    console.log(JSON.stringify(grades, null, 2))
    await grades.save()
    res.send(grades)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default { getAllGrades, addGrade, updateGrades }
