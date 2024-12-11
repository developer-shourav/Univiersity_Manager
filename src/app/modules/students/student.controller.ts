import { Request, Response } from 'express';
import { studentServices } from './student.service';

import { studentValidationSchema } from './student.validation';

/* ----------------------Create A Student----------------- */
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: createNewStudentData } = req.body;

    // -------------Validate Data Using Use Zod Validation-----------

    const zodValidationResult =
      studentValidationSchema.parse(createNewStudentData);

    // will call service function to send this data
    const result =
      await studentServices.createStudentIntoDB(zodValidationResult);

    // Send Response to the frontend
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    // If error occurs then give error response to the Fronted
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

/* ----------------------Get All Student----------------- */
const getAllStudent = async (req: Request, res: Response) => {
  try {
    // 1. Will call service function to get all Students
    const result = await studentServices.getAllStudentsFromDB();

    // 2. Send Response to the frontend
    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    // If error occurs then give error response to the Fronted
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

/* ----------------------Get Single Student----------------- */
const getAStudent = async (req: Request, res: Response) => {
  try {
    // 1. Will Call service function to get the student using id
    const { studentId } = req.params;
    const result = await studentServices.getAStudentFromDB(studentId);

    // 2. Send Response to the frontend
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    // If error occurs then give error response to the Fronted
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

/* ----------------------Delete Single Student----------------- */
const deleteAStudent = async (req: Request, res: Response) => {
  try {
    // 1. Will Call service function to get the student using id
    const { studentId } = req.params;
    const result = await studentServices.deleteAStudentFromDB(studentId);

    // 2. Send Response to the frontend
    res.status(200).json({
      success: true,
      message: 'Student Delete successfully',
      data: result,
    });
  } catch (err: any) {
    // If error occurs then give error response to the Fronted
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getAStudent,
  deleteAStudent,
};
