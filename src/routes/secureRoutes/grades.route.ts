import express from 'express'
import gradesController from '../../controllers/grades.controller'

const gradesRoutes = express.Router()

gradesRoutes.get('/gpa/:studentId', gradesController.getStudentsGPA)

gradesRoutes.get('/:studentId/:courseId?', gradesController.getStudentGrades)

gradesRoutes.post('/', gradesController.addGrade)

gradesRoutes.put('/:id', gradesController.updateGrades)

export default gradesRoutes
