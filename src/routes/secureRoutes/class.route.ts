import express from 'express';
import classController from '../../controllers/class.controller';

const classRoutes = express.Router();

classRoutes.get('/', classController.getAllClasses);

classRoutes.get('/:id', classController.getClassById);

classRoutes.post('/', classController.registerClass);

classRoutes.put('/:id', classController.updateClass);

classRoutes.delete('/:id', classController.deleteClass);

export default classRoutes;
