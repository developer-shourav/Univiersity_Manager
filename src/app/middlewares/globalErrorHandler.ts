import { NextFunction, Request, Response } from 'express';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const errorMsg = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message: errorMsg,
    error: err,
  });
};

export default globalErrorHandler;
