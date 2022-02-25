import express from 'express'
import subjectTeacherController from '../../controllers/subjectTeacher.controller'

const subjectTeacherRoutes = express.Router()

subjectTeacherRoutes.get('/', subjectTeacherController.getAllSubjectTeachers)

subjectTeacherRoutes.get('/:id', subjectTeacherController.getSubjectTeacherById)

subjectTeacherRoutes.post('/', subjectTeacherController.registerSubjectTeacher)

subjectTeacherRoutes.put('/:id', subjectTeacherController.updateSubjectTeacher)

subjectTeacherRoutes.delete('/:id', subjectTeacherController.deleteSubjectTeacher)

export default subjectTeacherRoutes
