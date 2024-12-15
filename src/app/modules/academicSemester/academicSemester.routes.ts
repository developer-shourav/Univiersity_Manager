import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = Router();

/* ------------Create a Semester---------- */
router.post(
  '/createAcademicSemester',
  validateRequest(academicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

/* ------------Get All Academic Semester ---------- */
router.get('/', AcademicSemesterControllers.getAcademicSemesters);

/* ------------Get an Academic Semester ---------- */
router.get('/:id', AcademicSemesterControllers.getAnAcademicSemester);

export const AcademicSemesterRoutes = router;
