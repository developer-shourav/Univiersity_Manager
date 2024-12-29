import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

/* ----------------------Create A Course---------------- */

const createACourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    message: 'Course is created successfully',
    data: result,
  });
});

/* ----------------------Get All Courses---------------- */
const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query;
  // 1. Will call service function to get all Courses
  const result = await CourseServices.getAllCoursesFromDB(query);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'All Courses are retrieved successfully',
    data: result,
  });
});

/* ----------------------Get Single Course----------------- */
const getACourse = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Course using id
  const { id } = req.params;
  const result = await CourseServices.getACourseFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Course retrieved successfully',
    data: result,
  });
});

/* ----------------------Update Single Course----------------- */
/* const updateAnAdmin = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Course using id
  const { id } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAnAdminFromDB(id, admin);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Course Updated successfully',
    data: result,
  });
});
 */

/* ----------------------Delete Single Course----------------- */
const deleteACourse = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Course using id
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Course Delete successfully',
    data: result,
  });
});

export const CourseControllers = {
  createACourse,
  getAllCourses,
  getACourse,
  deleteACourse,
};
