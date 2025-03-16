/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../students/student.model';


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
const {offeredCourse} = payload;
const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
if(!isOfferedCourseExist){
  throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
}

/* ------------ Check if the max capacity of the offered course exceed ----------- */
if(isOfferedCourseExist.maxCapacity <= 0){
  throw new AppError(httpStatus.BAD_REQUEST, 'Room is full !');
}

/* ------------Find the Student to get student objectId---------- */
const student = await Student.findOne({id: userId}).select('id');
if(!student){
  throw new AppError(httpStatus.NOT_FOUND, 'Student is not found !');
}

/* ------------Check if the student is already enrolled----------- */
const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({semesterRegistration: isOfferedCourseExist?.semesterRegistration, offeredCourse, student: student._id});

if(isStudentAlreadyEnrolled){
  throw new AppError(httpStatus.CONFLICT, 'Student already enrolled');
}



  return null
};
const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  return null;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
