import express from 'express'
import parallelController from '../../controllers/parallel.controller'

const parallelRoutes = express.Router()

parallelRoutes.get('/', parallelController.getAllParallels)

parallelRoutes.get('/non-assigned', parallelController.getNonAssignedParallels)

parallelRoutes.get('/students/:id', parallelController.getParallelStudents)

parallelRoutes.get('/:id', parallelController.getParallelById)

parallelRoutes.post('/', parallelController.registerParallel)

parallelRoutes.post('/add-student/:id', parallelController.addClassStudent)

parallelRoutes.post('/delete-student', parallelController.deleteStudentParallel)

parallelRoutes.put('/:id', parallelController.updateParallel)

parallelRoutes.delete('/:id', parallelController.deleteParallel)

export default parallelRoutes
