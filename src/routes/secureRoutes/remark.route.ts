import express from 'express'
import remarkController from '../../controllers/remark.controller'

const remarkRoutes = express.Router()

remarkRoutes.get('/', remarkController.getAllRemarks)

remarkRoutes.get('/', remarkController.getRemarksById)

remarkRoutes.get('/', remarkController.registerRemark)

remarkRoutes.get('/', remarkController.updateRemark)

remarkRoutes.get('/', remarkController.deleteRemark)

export default remarkRoutes

