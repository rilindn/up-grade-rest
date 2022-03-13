import express from 'express'
import studentRoutes from './student.route'
import classRoutes from './class.route'
import passport from 'passport'
import { loggedUser } from '../../controllers/auth.controller'
import staffRoutes from './staff.route'
import adminRoutes from './admin.route'
import subjectRoutes from './subject.route'
import gradesRoutes from './grades.route'
import courseRoutes from './course.route'
import parallelRoutes from './parallel.route'
import remarkRoutes from './remark.route'
import userRoutes from './user.route'

const router = express.Router()

// get logged user saved in session
router.get('/loggedUser', passport.authenticate('jwt', { session: false }), loggedUser)

router.use('/student', studentRoutes)
router.use('/staff', staffRoutes)
router.use('/admin', adminRoutes)
router.use('/class', classRoutes)
router.use('/subject', subjectRoutes)
router.use('/grades', gradesRoutes)
router.use('/course', courseRoutes)
router.use('/parallel', parallelRoutes)
router.use('/remark', remarkRoutes)
router.use('/user', userRoutes)

export default router
