import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

/* ------------Create a Department---------- */
router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

/* ------------Get All Academic Department ---------- */
router.get('/', AcademicDepartmentControllers.getAcademicDepartments);

/* ------------Get an Academic Department ---------- */
router.get('/:id', AcademicDepartmentControllers.getAnAcademicDepartment);

/* ------------Update an Academic Department ---------- */
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
