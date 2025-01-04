import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

/* ----------------------Create A Semester Registration ----------------- */
const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    message: 'Semester Registration is created successfully',
    data: result,
  });
});

/* ----------------------Get All Semester Registrations----------------- */
const getSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB();

  sendResponse(res, {
    message: 'Semester Registrations retrieved successfully',
    data: result,
  });
});

/* ----------------------Get A Semester Registration----------------- */
const getASemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getASemesterRegistrationFromDB(id);

  sendResponse(res, {
    message: 'Academic Semester retrieved successfully',
    data: result,
  });
});

/* ----------------------Update A Semester Registration ----------------- */

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateASemesterRegistrationIntoDB(
      id,
      req.body,
    );

  sendResponse(res, {
    message: 'Semester Registration Update successfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getSemesterRegistrations,
  getASemesterRegistration,
  updateSemesterRegistration,
};
