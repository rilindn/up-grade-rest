import express from 'express';
import studentRoutes from './student.route';
import classRoutes from './class.route';
import authRoutes from './auth.route';

const router = express.Router();

router.use('/student', studentRoutes);
router.use('/class', classRoutes);
router.use('/login', authRoutes);

export default router;
