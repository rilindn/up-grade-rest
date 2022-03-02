import express from 'express'
import courseController from '../../controllers/course.controller'

const courseRoutes = express.Router()

courseRoutes.get('/', courseController.getAllCourses)

courseRoutes.get('/teacher/:id', courseController.getCourseByTeacherId)

courseRoutes.get('/non-assigned/:parallelId', courseController.getParallelNonAssignedCourses)

courseRoutes.get('/:id', courseController.getCourseById)

courseRoutes.post('/', courseController.registerCourse)

courseRoutes.put('/:id', courseController.updateCourse)

courseRoutes.delete('/:id', courseController.deleteCourse)

export default courseRoutes
