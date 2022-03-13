import express from 'express'
import userController from '../../controllers/user.controller'

const userRoutes = express.Router()

userRoutes.put('/lang/:id', userController.changeLanguage)

userRoutes.put('/avatar/:id', userController.changeAvatarColor)

userRoutes.put('/password/:id', userController.changePassword)

export default userRoutes
