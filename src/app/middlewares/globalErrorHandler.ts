/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting Default Values
  let statusCode = err.status || 500; // Use a status code from the error if available
  let message = err.message || 'Something went wrong!';

  type TErrorSource = {
    path: string | number | undefined | null;
    message: string;
  }[];

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  /* ---------Ensure the error type ----------- */
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Ami Zod Error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};

export default globalErrorHandler;

//------------- Our targeted error pattern -------------
/*

success: false,
message: 'Something went wrong!',
errorSources:[
  path:'',
  message:''
]
stack: 'Error stack trace'



*/
