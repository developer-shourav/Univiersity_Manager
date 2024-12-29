import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

/* ----------------------Get All Admins----------------- */
const getAllAdmins = catchAsync(async (req, res) => {
  const query = req.query;
  // 1. Will call service function to get all Admins
  const result = await adminServices.getAllAdminsFromDB(query);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'All Admins are retrieved successfully',
    data: result,
  });
});

/* ----------------------Get Single Admin----------------- */
const getAnAdmin = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Admin using id
  const { id } = req.params;
  const result = await adminServices.getAnAdminFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Admin retrieved successfully',
    data: result,
  });
});

/* ----------------------Update Single Admin----------------- */
const updateAnAdmin = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Admin using id
  const { id } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAnAdminFromDB(id, admin);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Admin Updated successfully',
    data: result,
  });
});

/* ----------------------Delete Single Admin----------------- */
const deleteAnAdmin = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Admin using id
  const { id } = req.params;
  const result = await adminServices.deleteAnAdminFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Admin Delete successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getAnAdmin,
  updateAnAdmin,
  deleteAnAdmin,
};
