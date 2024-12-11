import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.routes';
import { UserRoutes } from './app/modules/user/user.routes';
const app: Application = express();

/* --------Parser--------- */
app.use(express.json());
app.use(cors());

/* ------- Application Routes----------  */

/* ------- User Route */
app.use('/api/v1/users', UserRoutes);

/* ------- Students Route */
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to University Manager! 🎇✨🎉');
});

export default app;
