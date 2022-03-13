import { Request, Response } from 'express'
import { registerSchema, addScheduleHourSchema, updateScheduleHourSchema, deleteScheduleHourSchema } from '../validators/schedule.validation'
import Schedule from '../models/schedule.model'
import { defaultDays } from '../services/schedule.service'
import parallelModel from '../models/parallel.model'

const getParallelsSchedule = async (req: Request, res: Response) => {
  const parallel = req.params.parallel
  try {
    const schedule = await Schedule.findOne({ parallel })
    return res.send(schedule)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getStudentSchedule = async (req: Request, res: Response) => {
  const studentId = req.params.id

  let parallels = await parallelModel.find()

  if (!parallels) res.status(404).send('Parallels not found!')

  try {
    const parallel = parallels?.find(({ students }: any) => {
      return students.find(({ student }: any) => student === studentId)
    })?._id

    if (!parallel) res.status(404).send('Parallel not found!')

    const schedule = await Schedule.findOne({ parallel })

    if (!schedule) res.status(404).send('Schedule not found!')

    res.send(schedule)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getTeacherSchedule = async (req: Request, res: Response) => {
  const teacherId = req.params.id
  let teacherSchedules: any = []
  const schedules: any = await Schedule.find()

  const getParallelDetails = async (id: any) => {
    const parallel = await parallelModel.findById(id)
    return {
      parallelName: parallel.name,
      parallelClass: parallel.class,
    }
  }

  try {
    Promise.all(
      schedules.map(async (schedule: any) => {
        await Promise.all(
          schedule.days.map(async (item: any) => {
            const hours: any = []
            const { parallelName, parallelClass }: any = await getParallelDetails(schedule.parallel)
            const parallel = {
              id: schedule.parallel,
              parallelName,
              parallelClass,
            }
            await Promise.all(
              item.hours.map(async (hour: any) => {
                if (hour?.teacherId === teacherId) {
                  hours.push({
                    parallel,
                    hour,
                  })
                }
              }),
            ).then(() => {
              teacherSchedules.push({
                day: item.day,
                hours,
              })
            })
          }),
        )
      }),
    ).then(() => {
      return res.send(teacherSchedules)
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerSchedule = async (req: Request, res: Response) => {
  const days = defaultDays()
  const parallel = req.body.parallel

  const validationResult = registerSchema.validate({ parallel })
  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  const schedule = await Schedule.findOne({ parallel })
  if (schedule) return res.send('Schedule for this parallel already exists!')

  const newSchedule = new Schedule({ parallel, days })
  try {
    await newSchedule.save()
    return res.send(newSchedule)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const addScheduleHour = async (req: Request, res: Response) => {
  const { parallel, day, hours } = req.body
  const validationResult = addScheduleHourSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    let schedule = await Schedule.findOne({ parallel })
    if (!schedule) res.status(404).send('Schedule not found!')
    schedule.days.map((daySchedule: any) => {
      if (daySchedule.day === day) {
        hours.map((item: any) => daySchedule.hours.push(item))
      }
    })

    await schedule.save()
    res.send(schedule)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateScheduleHour = async (req: Request, res: Response) => {
  const { parallel, day, course, hours } = req.body
  const validationResult = updateScheduleHourSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    let schedule = await Schedule.findOne({ parallel })
    if (!schedule) res.status(404).send('Schedule not found!')
    schedule.days.map((daySchedule: any) => {
      if (daySchedule.day === day) {
        const foundIndex = daySchedule.hours.findIndex((hour: any) => hour.courseId === course)
        daySchedule.hours[foundIndex] = hours
      }
    })
    await schedule.save()
    res.send(schedule)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteScheduleHour = async (req: Request, res: Response) => {
  const { parallel, day, hourId } = req.body
  const validationResult = deleteScheduleHourSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    let schedule = await Schedule.findOne({ parallel })
    if (!schedule) res.status(404).send('Schedule not found!')
    schedule.days.map((daySchedule: any) => {
      if (daySchedule.day === day) {
        console.log('first', daySchedule.hours)
        daySchedule.hours = daySchedule.hours.filter((hour: any) => hour._id.toString() !== hourId)
        console.log('first2', daySchedule.hours)
      }
    })
    await schedule.save()
    res.send(schedule)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id)
    if (!schedule) res.status(404).send('Schedule not found!')
    res.status(200).send(schedule)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  getParallelsSchedule,
  getStudentSchedule,
  getTeacherSchedule,
  registerSchedule,
  addScheduleHour,
  updateScheduleHour,
  deleteScheduleHour,
  deleteSchedule,
}
