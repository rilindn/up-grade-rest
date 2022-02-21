import express from 'express'
import studentController from '../../controllers/student.controller'

const studentRouter = express.Router()

studentRouter.get('/', studentController.getAllStudents)

studentRouter.get('/filter', studentController.getFilteredUsers)

studentRouter.get('/:id', studentController.getStudentById)

studentRouter.post('/', studentController.registerStudent)

studentRouter.put('/:id', studentController.updateStudent)

studentRouter.delete('/:id', studentController.deleteStudent)

export default studentRouter
