import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// Will call controller function------
/* -------Create an Student */
router.post('/create-student', StudentControllers.createStudent);

/* -------Get All Student */
router.get('/', StudentControllers.getAllStudent);

/* --------Get A Student */
router.get('/:studentId', StudentControllers.getAStudent);

/* --------Delete A Student */
router.delete('/:studentId', StudentControllers.deleteAStudent);

export const StudentRoutes = router;
