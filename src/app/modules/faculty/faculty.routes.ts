import express from 'express';
import { FacultiesControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

/* -------Get All Faculty */
router.get('/', auth(USER_ROLE.admin), FacultiesControllers.getAllFaculties);

/* --------Get A Faculty */
router.get('/:id', FacultiesControllers.getAFaculty);

/* --------Update A Faculty */
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultiesControllers.updateAFaculty,
);

/* --------Delete A Faculty */
router.delete('/:id', FacultiesControllers.deleteAFaculty);

export const FacultyRoutes = router;
