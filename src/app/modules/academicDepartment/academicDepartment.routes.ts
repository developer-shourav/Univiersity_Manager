import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = Router();

/* ------------Create a Department---------- */
router.post(
  '/create-academic-department',
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
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
