import express from 'express';
import studentRoutes from './student.route';

const router = express.Router();

router.use('/student', studentRoutes);

export default router;
