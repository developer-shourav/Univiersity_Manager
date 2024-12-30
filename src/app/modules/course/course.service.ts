import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

/* -------------- Create a Course into Data ---------- */
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

/* -------------- Get All Courses From Database ---------- */
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseSearchableQuery = ['title', 'prefix', 'code'];
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableQuery)
    .filter()
    .sort()
    .pagination()
    .fieldFiltering();
  const result = await courseQuery.queryModel;

  return result;
};

/* -------------- Get A Course From Database ---------- */
const getACourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return result;
};

/* -------------- Update A Course From Database ---------- */
const updateACourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Step:1 Basic Course Info Update
    const updateCourseBasicInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateCourseBasicInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // Check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((element) => element.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // Filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (item) => item.course && !item.isDeleted,
      );

      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

/* -------------- Delete A Course From Database ---------- */
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getACourseFromDB,
  updateACourseIntoDB,
  deleteCourseFromDB,
};
