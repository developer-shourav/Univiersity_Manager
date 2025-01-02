import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './semesterRegistration.service';

/* ----------------------Create An Academic Semester ----------------- */
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

/* ----------------------Get All Academic Semester----------------- */
const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    message: 'Academic Semesters retrieved successfully',
    data: result,
  });
});

/* ----------------------Get An Academic Semester----------------- */
const getAnAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.getAnAcademicSemesterFromDB(id);

  sendResponse(res, {
    message: 'Academic Semester retrieved successfully',
    data: result,
  });
});

/* ----------------------Update An Academic Semester----------------- */

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    message: 'Academic Semester Update successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
  getAnAcademicSemester,
  updateAcademicSemester,
};
