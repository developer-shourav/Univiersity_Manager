import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyVAlidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

/* ------------Create a Faculty---------- */
router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyVAlidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

/* ------------Get All Academic Faculty ---------- */
router.get('/', AcademicFacultyControllers.getAcademicFaculties);

/* ------------Get an Academic Faculty ---------- */
router.get('/:id', AcademicFacultyControllers.getAnAcademicFaculty);

/* ------------Update an Academic Faculty ---------- */
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyVAlidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFacultyFromDB,
);

export const AcademicFacultyRoutes = router;
