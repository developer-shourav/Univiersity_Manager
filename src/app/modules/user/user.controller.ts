import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

/* ----------------------Create A Student----------------- */
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: createNewStudentData } = req.body;

  // will call service function to send this data
  const result = await UserServices.createStudentIntoDB(
    password,
    createNewStudentData,
  );

  sendResponse(res, {
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
