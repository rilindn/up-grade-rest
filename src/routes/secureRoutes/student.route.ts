import express from 'express';
import studentController from '../../controllers/student.controller';

const studentRouter = express.Router();

studentRouter.get('/', studentController.getAllStudents);

studentRouter.get('/paginate', studentController.getPaniationItems);

studentRouter.get('/:id', studentController.getStudentById);

studentRouter.post('/', studentController.registerStudent);

studentRouter.put('/:id', studentController.updateStudent);

studentRouter.delete('/:id', studentController.deleteStudent);

export default studentRouter;
