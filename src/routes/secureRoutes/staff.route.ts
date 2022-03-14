import express from 'express'
import staffController from '../../controllers/staff.controller'

const staffRouter = express.Router()

staffRouter.get('/', staffController.getAllStaff)

staffRouter.get('/filter', staffController.getFilteredStaff)

staffRouter.get('/:id', staffController.getStaffById)

staffRouter.post('/', staffController.registerStaff)

staffRouter.put('/:id', staffController.updateStaff)

staffRouter.delete('/:id', staffController.deleteStaff)

export default staffRouter
