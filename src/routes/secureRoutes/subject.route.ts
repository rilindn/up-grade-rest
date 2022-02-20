import express from 'express'
import subjectController from '../../controllers/subject.controller'

const subjectRoutes = express.Router()

subjectRoutes.get('/', subjectController.getAllSubjects)

subjectRoutes.get('/:id', subjectController.getSubjectById)

subjectRoutes.post('/', subjectController.registerSubject)

subjectRoutes.put('/:id', subjectController.updateSubject)

subjectRoutes.delete('/:id', subjectController.deleteSubject)

export default subjectRoutes
