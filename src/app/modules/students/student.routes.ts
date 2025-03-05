import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Will call controller function------

/* -------Get All Student */
router.get('/', StudentControllers.getAllStudent);

/* --------Get A Student */
router.get('/:id', StudentControllers.getAStudent);

/* --------Update A Student */
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateAStudent,
);

/* --------Delete A Student */
router.delete('/:id', StudentControllers.deleteAStudent);

export const StudentRoutes = router;
