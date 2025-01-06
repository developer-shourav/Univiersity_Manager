import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = Router();

/* ------------Create a Semester Registration---------- */
router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

/* ------------Get All Semester Registrations ---------- */
router.get('/', SemesterRegistrationControllers.getSemesterRegistrations);

/* ------------Get a Semester Registration---------- */
router.get('/:id', SemesterRegistrationControllers.getASemesterRegistration);

/* ------------Update A Semester Registration ---------- */
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

/* ------------Delete a Semester Registration---------- */
router.delete(
  '/:id',
  SemesterRegistrationControllers.deleteASemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
