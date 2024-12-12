import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

/* ----------------------Get All Student----------------- */
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Will call service function to get all Students
    const result = await studentServices.getAllStudentsFromDB();

    // 2. Send Response to the frontend
    sendResponse(res, {
      message: 'All students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/* ----------------------Get Single Student----------------- */
const getAStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Will Call service function to get the student using id
    const { studentId } = req.params;
    const result = await studentServices.getAStudentFromDB(studentId);

    // 2. Send Response to the frontend
    sendResponse(res, {
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/* ----------------------Delete Single Student----------------- */
const deleteAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Will Call service function to get the student using id
    const { studentId } = req.params;
    const result = await studentServices.deleteAStudentFromDB(studentId);

    // 2. Send Response to the frontend
    sendResponse(res, {
      message: 'Student Delete successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudent,
  getAStudent,
  deleteAStudent,
};
