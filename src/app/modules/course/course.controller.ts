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
const updateCourse = catchAsync(async (req, res) => {
  // 1. Will Call service function to get the Course using id
  const { id } = req.params;
  const result = await CourseServices.updateACourseIntoDB(id, req.body);

  // 2. Send Response to the frontend
  sendResponse(res, {
    message: 'Course Updated successfully',
    data: result,
  });
});

/* ----------------------Assign Faculties into Course----------------- */
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    message: 'Course Assign to faculty successfully',
    data: result,
  });
});

/* ----------------------Get assigned Faculties----------------- */
const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);

  sendResponse(res, {
    message: 'Faculties retrieved successfully',
    data: result,
  });
});

/* ----------------------Remove Faculties From Course----------------- */
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesFromCourseIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    message: 'Course removed from faculty successfully',
    data: result,
  });
});

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
  updateCourse,
  assignFacultiesWithCourse,
  getFacultiesWithCourse,
  removeFacultiesFromCourse,
  deleteACourse,
};
