import express from 'express'
import courseController from '../../controllers/course.controller'

const courseRoutes = express.Router()

courseRoutes.get('/', courseController.getAllCourses)

courseRoutes.get('/non-assigned', courseController.getNonAssignedCourses)

courseRoutes.get('/:id', courseController.getCourseById)

courseRoutes.post('/', courseController.registerCourse)

courseRoutes.put('/:id', courseController.updateCourse)

courseRoutes.delete('/:id', courseController.deleteCourse)

export default courseRoutes
