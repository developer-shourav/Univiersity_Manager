import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

/* ----------------------Create A Student----------------- */
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
