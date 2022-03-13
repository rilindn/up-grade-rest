import express from 'express'
import scheduleController from '../../controllers/schedule.controller'

const scheduleRoutes = express.Router()

scheduleRoutes.get('/:parallel', scheduleController.getParallelsSchedule)

scheduleRoutes.get('/student/:id', scheduleController.getStudentSchedule)

scheduleRoutes.get('/teacher/:id', scheduleController.getTeacherSchedule)

scheduleRoutes.post('/', scheduleController.registerSchedule)

scheduleRoutes.post('/add-hour', scheduleController.addScheduleHour)

scheduleRoutes.put('/update-hour', scheduleController.updateScheduleHour)

scheduleRoutes.put('/delete-hour', scheduleController.deleteScheduleHour)

scheduleRoutes.delete('/:id', scheduleController.deleteSchedule)

export default scheduleRoutes
