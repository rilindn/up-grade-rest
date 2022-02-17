import express from 'express';
import adminController from '../../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.get('/', adminController.getAllAdmins);

adminRouter.get('/:id', adminController.getAdminById);

adminRouter.post('/', adminController.registerAdmin);

adminRouter.put('/:id', adminController.updateAdmin);

adminRouter.delete('/:id', adminController.deleteAdmin);

export default adminRouter;
