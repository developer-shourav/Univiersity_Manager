import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = Router();

/* ------------Create a Semester---------- */
router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

/* ------------Get All Academic Semester ---------- */
router.get('/', AcademicSemesterControllers.getAcademicSemesters);

/* ------------Get an Academic Semester ---------- */
router.get('/:id', AcademicSemesterControllers.getAnAcademicSemester);

/* ------------Update an Academic Semester ---------- */
router.patch(
  '/:id',
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
