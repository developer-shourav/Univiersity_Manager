import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

/* ----------------------Login In an User----------------- */
const loginUser = catchAsync(async (req, res) => {
  // 1. Will call service function to get all Faculties
  const result = await AuthServices.logInUser(req.body);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'User is logged in successfully!',
    data: result,
  });
});

/* ----------------------Change Password----------------- */
const changePassword = catchAsync(async (req, res) => {
  // 1. Will call service function to get all Faculties

  const { ...passwordData } = req.body;
  const result = await AuthServices.changePasswordIntoDB(
    req.user,
    passwordData,
  );

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Password Changed successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
