import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = Router();

router.post(
  '/createAcademicSemester',
  validateRequest(academicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
