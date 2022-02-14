import express from 'express';
import studentRoutes from './student.route';
import classRoutes from './class.route';

const router = express.Router();

router.use('/student', studentRoutes);
router.use('/class', classRoutes);

export default router;
