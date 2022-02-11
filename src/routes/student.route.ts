import express from 'express';
import studentController from '../controllers/student.controller';

const studentRouter = express.Router();

studentRouter.get('/', studentController.getAllStudents);

studentRouter.post('/create', studentController.createStudent);

export default studentRouter;
