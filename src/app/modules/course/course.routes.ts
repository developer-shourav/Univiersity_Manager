import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = Router();

/* ------------Create a Course---------- */
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createACourse,
);

/* ------------Get All Courses ---------- */
router.get('/', CourseControllers.getAllCourses);

/* ------------Get A Course ---------- */
router.get('/:id', CourseControllers.getACourse);

/* ------------Update A Course ---------- */
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

/* ------------- Assign Faculties into course----------- */
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.assignFacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
/* ------------Delete A Course ---------- */
router.delete('/:id', CourseControllers.deleteACourse);

export const CourseRoutes = router;
