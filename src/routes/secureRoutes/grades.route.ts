import express from 'express'
import gradesController from '../../controllers/grades.controller'

const gradesRoutes = express.Router()

gradesRoutes.get('/:id', gradesController.getAllGrades)

gradesRoutes.post('/', gradesController.addGrade)

gradesRoutes.put('/:id', gradesController.updateGrades)

export default gradesRoutes
