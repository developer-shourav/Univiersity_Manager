import express from 'express';
import { FacultiesControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

/* -------Get All Faculty */
router.get('/', auth(), FacultiesControllers.getAllFaculties);

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
