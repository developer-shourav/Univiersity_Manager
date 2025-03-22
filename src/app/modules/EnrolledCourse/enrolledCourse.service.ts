/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../students/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /* -------Break Down The Tasks:-----------
  Segment 1: Check if the offered courses is exists
  Segment 2: Check if the student is already enrolled
  Segment 3: Check if the max capacity of the offered course exceed
  Segment 4: Create A Enrolled course

  -----------------------------------*/

  /* ------------check if the offered courses is exists----------- */
  const { offeredCourse } = payload;
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  /* ------------ Check if the max capacity of the offered course exceed ----------- */
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full !');
  }

  /* ------------Find the Student to get student objectId---------- */
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is not found !');
  }

  /* ------------Check if the student is already enrolled----------- */
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student already enrolled');
  }

  /* ----------- Check Course Details----------- */
  const course = await Course.findById(isOfferedCourseExist.course);

  /* ----------Check total credits exceeds maxCredit-------- */
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('maxCredit');

  /* -------Calculate user enrolled courses all credits----  */
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  /*--------Check user total enrolled credits and New enrolled course is more then the maxCredit------*/
  const sumOfEnrolledCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCredits : 0;
  const newCourseCredits = course?.credits;
  const maxCredits = semesterRegistration?.maxCredit;

  if (
    sumOfEnrolledCredits &&
    maxCredits &&
    sumOfEnrolledCredits + newCourseCredits > maxCredits
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }

  /* ----------Start Session for write-------- */
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExist.course,
          student: student._id,
          faculty: isOfferedCourseExist.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enrolled in this course !',
      );
    }

    const maxCapacity = isOfferedCourseExist.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};

/* -----------------------Update Enrolled Course Marks------------------------ */

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  /* ------------check if the semester registration is exists----------- */
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  /* ------------check if the offered course is exists----------- */
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course not found !');
  }

  /* ------------check if the student is exists----------- */
  const isStudentExist = await Student.findById(student);
  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is not found !');
  }

  return { courseMarks };
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
