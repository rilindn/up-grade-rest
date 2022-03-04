import express from 'express'
import remarkController from '../../controllers/remark.controller'

const remarkRoutes = express.Router()

remarkRoutes.get('/', remarkController.getAllRemarks)

remarkRoutes.get('/:id', remarkController.getRemarksById)

remarkRoutes.post('/', remarkController.registerRemark)

remarkRoutes.put('/:id', remarkController.updateRemark)

remarkRoutes.delete('/:id', remarkController.deleteRemark)

export default remarkRoutes

