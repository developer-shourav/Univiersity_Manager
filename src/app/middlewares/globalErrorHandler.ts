/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.status || 500; // Use a status code from the error if available
  const errorMsg = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message: errorMsg,
    error: err,
  });
};

export default globalErrorHandler;
