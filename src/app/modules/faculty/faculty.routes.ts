import express from 'express';
import { FacultiesControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

/* -------Get All Faculty */
router.get('/', FacultiesControllers.getAllFaculties);

/* --------Get A Faculty */
router.get('/:facultyId', FacultiesControllers.getAFaculty);

/* --------Update A Faculty */
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultiesControllers.updateAFaculty,
);

/* --------Delete A Faculty */
router.delete('/:facultyId', FacultiesControllers.deleteAFaculty);

export const FacultyRoutes = router;
