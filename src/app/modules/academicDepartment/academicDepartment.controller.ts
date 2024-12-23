import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

/* ----------------------Create An Academic Department ----------------- */
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    message: 'Academic Department is created successfully',
    data: result,
  });
});

/* ----------------------Get All Academic Department----------------- */
const getAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    message: 'Academic Department retrieved successfully',
    data: result,
  });
});

/* ----------------------Get An Academic Department----------------- */
const getAnAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);

  sendResponse(res, {
    message: 'Academic Department retrieved successfully',
    data: result,
  });
});

/* ----------------------Update An Academic Department----------------- */

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      id,
      req.body,
    );

  sendResponse(res, {
    message: 'Academic Department Update successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAcademicDepartments,
  getAnAcademicDepartment,
  updateAcademicDepartment,
};
