import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { StudentRoutes } from '../modules/students/student.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = Router();

/* ------- Application Parent Routes---------- */
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route),
);

export default router;
