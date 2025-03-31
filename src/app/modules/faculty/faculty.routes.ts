import express from 'express';
import { FacultiesControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

/* -------Get All Faculty */
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultiesControllers.getAllFaculties,
);

/* --------Get A Faculty */
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultiesControllers.getAFaculty,
);

/* --------Update A Faculty */
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultiesControllers.updateAFaculty,
);

/* --------Delete A Faculty */
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultiesControllers.deleteAFaculty,
);

export const FacultyRoutes = router;
