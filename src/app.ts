import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

/* --------Parser--------- */
app.use(express.json());
app.use(cors());

/* ------- Root Route ----------*/
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to University Manager! 🎇✨🎉');
});

/* ------Global Error Handler Middleware------- */
app.use(globalErrorHandler as express.ErrorRequestHandler); // Explicitly cast here

/* ------Global Not Found Middleware------- */
app.use(notFound);

export default app;
