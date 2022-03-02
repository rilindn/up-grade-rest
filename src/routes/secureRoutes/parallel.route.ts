import express from 'express'
import parallelController from '../../controllers/parallel.controller'

const parallelRoutes = express.Router()

parallelRoutes.get('/', parallelController.getAllParallels)

parallelRoutes.get('/non-assigned', parallelController.getNonAssignedParallels)

parallelRoutes.get('/students/:id', parallelController.getParallelStudents)

parallelRoutes.get('/courses/:id', parallelController.getParallelCourses)

parallelRoutes.get('/teacher/:id', parallelController.getTeacherParallels)

parallelRoutes.get('/teacher/:parallelId/:teacherId', parallelController.getTeacherParallelCourses)

parallelRoutes.get('/:id', parallelController.getParallelById)

parallelRoutes.post('/', parallelController.registerParallel)

parallelRoutes.post('/add-student/:id', parallelController.addClassStudent)

parallelRoutes.post('/add-course/:id', parallelController.addClassCourse)

parallelRoutes.post('/delete-student', parallelController.deleteStudentParallel)

parallelRoutes.post('/delete-course', parallelController.deleteParallelCourse)

parallelRoutes.put('/:id', parallelController.updateParallel)

parallelRoutes.delete('/:id', parallelController.deleteParallel)

export default parallelRoutes
