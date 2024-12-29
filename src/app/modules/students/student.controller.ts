import catchAsync from '../../utils/catchAsync';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

/* ----------------------Get All Student----------------- */
const getAllStudent = catchAsync(async (req, res) => {
  const query = req.query;
  // 1. Will call service function to get all Students
  const result = await studentServices.getAllStudentsFromDB(query);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'All students are retrieved successfully',
    data: result,
  });
});

/* ----------------------Get Single Student----------------- */
const getAStudent = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the student using id
  const { id } = req.params;
  const result = await studentServices.getAStudentFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Student retrieved successfully',
    data: result,
  });
});

/* ----------------------Update Single Student----------------- */
const updateAStudent = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the student using id
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateAStudentFromDB(id, student);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Student Updated successfully',
    data: result,
  });
});

/* ----------------------Delete Single Student----------------- */
const deleteAStudent = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the student using id
  const { id } = req.params;
  const result = await studentServices.deleteAStudentFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Student Delete successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getAStudent,
  updateAStudent,
  deleteAStudent,
};
