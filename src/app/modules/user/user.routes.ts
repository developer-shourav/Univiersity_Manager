import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../students/student.validation';
import { UserControllers } from './user.controller';
import { facultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

// -----------Create A Student
router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

// -----------Create A Faculty
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

// -----------Create An Admin
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
