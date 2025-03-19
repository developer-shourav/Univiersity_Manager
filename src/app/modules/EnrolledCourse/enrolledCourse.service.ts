/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../students/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /* -------TODO:-----------
  step1: Check if the offered courses is exists
  step2: Check if the student is already enrolled
  step3: Create A Enrolled course
  step4: 

   */

  /* ------------heck if the offered courses is exists----------- */
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

  /* ----------Check total credits exceeds maxCredit-------- */
  const semesterRegistration = await SemesterRegistration.findById(isOfferedCourseExist.semesterRegistration).select('maxCredit');

  /* -------Check user total enrolled credits and New enrolled course is more then the maxCredit----  */
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student._id,
      },
    },
  ])
  console.log(enrolledCourses);

  /* ----------Start Session for write-------- */
 /*  const session = await mongoose.startSession();

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
  } */
};
const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  return { facultyId, payload };
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
