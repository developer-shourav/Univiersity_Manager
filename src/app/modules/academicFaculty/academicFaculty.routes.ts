import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyVAlidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';


const router = Router();

/* ------------Create a Faculty---------- */
router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyVAlidation.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

/* ------------Get All Academic Faculty ---------- */
router.get('/', AcademicFacultyControllers.getAcademicFaculties);

/* ------------Get an Academic Faculty ---------- */
router.get('/:id', AcademicFacultyControllers.getAnAcademicFaculty);

/* ------------Update an Academic Faculty ---------- */
router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyVAlidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFacultyFromDB,
);

export const AcademicFacultyRoutes = router;
