import { Request, RequestHandler, Response, NextFunction } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

/* ----------------------Get All Student----------------- */
const getAllStudent = catchAsync(async (req, res, next) => {
  // 1. Will call service function to get all Students
  const result = await studentServices.getAllStudentsFromDB();

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'All students are retrieved successfully',
    data: result,
  });
});

/* ----------------------Get Single Student----------------- */
const getAStudent = catchAsync(async (req, res, next) => {
  // 1. Will Call service function to get the student using id
  const { studentId } = req.params;
  const result = await studentServices.getAStudentFromDB(studentId);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Student retrieved successfully',
    data: result,
  });
});

/* ----------------------Delete Single Student----------------- */
const deleteAStudent = catchAsync(async (req, res, next) => {
  // 1. Will Call service function to get the student using id
  const { studentId } = req.params;
  const result = await studentServices.deleteAStudentFromDB(studentId);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Student Delete successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getAStudent,
  deleteAStudent,
};
