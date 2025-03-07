import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

/* ----------------------Create A Student----------------- */
const createStudent = catchAsync(async (req, res) => {
  const profileImage = req.file;

  console.log('🚀 ~ createStudent ~ profileImage:', profileImage);
  console.log(req.body);

  /* const { password, student: createNewStudentData } = req.body;

  // will call service function to send this data
  const result = await UserServices.createStudentIntoDB(
    password,
    createNewStudentData,
  ); */

  sendResponse(res, {
    message: 'Student is created successfully',
    data: null,
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

/* ----------------------Change User Status by Admin----------------- */
const changeStatus = catchAsync(async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  // will call service function to send this data
  const result = await UserServices.changeUserStatusIntoDB(id, payload);

  sendResponse(res, {
    message: 'User status is changed successfully',
    data: result,
  });
});

/* ----------------------Get Me (Controller for getting present user info)----------------- */
const getMe = catchAsync(async (req, res) => {
  const { role, userId } = req.user;

  // will call service function to send this data
  const result = await UserServices.getMe(role, userId);
  const userRole = role.charAt(0).toUpperCase() + role.slice(1);

  sendResponse(res, {
    message: `${userRole} data is fetched successfully`,
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe,
};
