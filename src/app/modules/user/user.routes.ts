import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../students/student.validation';
import { UserControllers } from './user.controller';
import { facultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/hostImageToCloudinary';
import { formDataToJsonConvertor } from '../../middlewares/formDataToJsonConvertor';

const router = express.Router();

// -----------Create A Student
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('profileImage'),
  formDataToJsonConvertor,
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

// -----------Create A Faculty
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('profileImage'),
  formDataToJsonConvertor,
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

// -----------Create An Admin
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  upload.single('profileImage'),
  formDataToJsonConvertor,
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

// -----------Change User Status by Admin
router.patch(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

// -----------Route to get all kinds of users (Admin, Faculty, Student) own data
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserControllers.getMe,
);

export const UserRoutes = router;
