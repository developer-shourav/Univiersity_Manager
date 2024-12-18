import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

/* ----------------------Create An Academic Faculty ----------------- */
const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    message: 'Academic faculty is created successfully',
    data: result,
  });
});

/* ----------------------Get All Academic Faculties----------------- */
const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    message: 'Academic faculties retrieved successfully',
    data: result,
  });
});

/* ----------------------Get An Academic Faculty----------------- */
const getAnAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);

  sendResponse(res, {
    message: 'Academic faculty retrieved successfully',
    data: result,
  });
});

/* ----------------------Update An Academic Faculty----------------- */

const updateAcademicFacultyFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    id,
    req.body,
  );

  sendResponse(res, {
    message: 'Academic faculty Update successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculties,
  getAnAcademicFaculty,
  updateAcademicFacultyFromDB,
};
