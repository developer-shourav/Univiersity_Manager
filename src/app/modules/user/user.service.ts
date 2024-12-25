import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utiles';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

/* --------Logic For Create an Student------ */
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create an user object
  const userData: Partial<TUser> = {};

  // ----------If Password is not given , use default password----------
  userData.password = password || (config.default_password as string);

  // ----------Set student role----------
  userData.role = 'student';

  // ----------Find academic semester info----------
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // ----------Set Manually Generated Id
  userData.id = await generateStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // ----------Create an user
    const newUser = await User.create([userData], { session });

    // ----------Create a Student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id,  _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference Id

    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
