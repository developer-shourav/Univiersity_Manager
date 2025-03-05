import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

/* ----------------------Login In an User----------------- */
const loginUser = catchAsync(async (req, res) => {
  // 1. Will call service function to get all Faculties
  const result = await AuthServices.logInUser(req.body);
  // --- Get refresh token form result
  const { refreshToken, accessToken, needsPasswordChange } = result;

  // --- Save Refresh token into cookies
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
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
    message: 'Password Update successfully!',
    data: result,
  });
});

/* ------------------ Get Access  Token------------------ */
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // 1. Will call service function to get refresh token
  const result = await AuthServices.refreshToken(refreshToken);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

/* ----------------------Forget Password----------------- */
const forgetPassword = catchAsync(async (req, res) => {
  // 1. Will call service function to get all Faculties

  const userId = req.body.id;
  const result = await AuthServices.forgetPasswordIntoDB(userId);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

/* ----------------------Reset Password----------------- */
const resetPassword = catchAsync(async (req, res) => {
  // 1. Will call service function to get all Faculties

  const resetPasswordInfo = req.body;
  const token = req.headers?.authorization;
  const result = await AuthServices.resetPasswordIntoDB(
    resetPasswordInfo,
    token as string,
  );

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Password reset successful!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
