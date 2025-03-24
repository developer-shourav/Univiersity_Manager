import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

/* ------------Create a Semester---------- */
router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
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
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
