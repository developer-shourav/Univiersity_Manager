import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

/* ----------------------Create A Student----------------- */
const createStudent = catchAsync(async (req, res) => {
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

/* ----------------------Create A Faculty----------------- */
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: createNewFacultyData } = req.body;

  // will call service function to send this data
  const result = await UserServices.createFacultyIntoDB(
    password,
    createNewFacultyData,
  );

  sendResponse(res, {
    message: 'Faculty is created successfully',
    data: result,
  });
});

/* ----------------------Create An Admin----------------- */
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: createNewAdminData } = req.body;

  // will call service function to send this data
  const result = await UserServices.createAdminIntoDB(
    password,
    createNewAdminData,
  );

  sendResponse(res, {
    message: 'Admin is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
