import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyServices } from './faculty.service';

/* ----------------------Get All Faculties----------------- */
const getAllFaculties = catchAsync(async (req, res) => {
  const query = req.query;
  // 1. Will call service function to get all Faculties
  const result = await facultyServices.getAllFacultiesFromDB(query);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'All faculties are retrieved successfully',
    data: result,
  });
});

/* ----------------------Get Single Faculty----------------- */
const getAFaculty = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the student using id
  const { id } = req.params;
  const result = await facultyServices.getAFacultyFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Faculty retrieved successfully',
    data: result,
  });
});

/* ----------------------Update Single Faculty----------------- */
const updateAFaculty = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the faculty using id
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateAFacultyFromDB(id, faculty);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Faculty Updated successfully',
    data: result,
  });
});

/* ----------------------Delete Single Faculty----------------- */
const deleteAFaculty = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the faculty using id
  const { facultyId } = req.params;
  const result = await facultyServices.deleteAFacultyFromDB(facultyId);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Faculty Delete successfully',
    data: result,
  });
});

export const FacultiesControllers = {
  getAllFaculties,
  getAFaculty,
  updateAFaculty,
  deleteAFaculty,
};
