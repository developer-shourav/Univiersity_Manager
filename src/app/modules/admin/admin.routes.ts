import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

/* -------Get All Admins */
router.get('/', AdminControllers.getAllAdmins);

/* --------Get An Admin */
router.get('/:id', AdminControllers.getAnAdmin);

/* --------Update An Admin */
router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAnAdmin,
);

/* --------Delete An Admin */
router.delete('/:id', AdminControllers.deleteAnAdmin);

export const AdminRoutes = router;
