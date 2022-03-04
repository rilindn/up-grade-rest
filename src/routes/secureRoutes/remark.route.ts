import express from 'express'
import remarkController from '../../controllers/remark.controller'

const remarkRoutes = express.Router()

remarkRoutes.get('/', remarkController.getAllRemarks)

remarkRoutes.get('/:id', remarkController.getRemarksById)

remarkRoutes.post('/', remarkController.registerRemark)

remarkRoutes.put('/', remarkController.updateRemark)

remarkRoutes.delete('/', remarkController.deleteRemark)

export default remarkRoutes

