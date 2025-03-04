import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utiles';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { TFaculty } from '../faculty/faculty.interface';
import { Admin } from '../admin/admin.model';

/* --------Logic For Create an Student------ */
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create an user object
  const userData: Partial<TUser> = {};

  // ----------If Password is not given , use default password----------
  userData.password = password || (config.default_password as string);

  // ----------Set student role and Email----------
  userData.role = 'student';
  userData.email = payload.email;
  // ----------Find academic semester info----------
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // ----------Set Manually Generated Id
    userData.id = await generateStudentId(admissionSemester);

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

/* --------Logic For Create an Faculty------ */
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // Create an user object
  const userData: Partial<TUser> = {};

  // ----------If Password is not given , use default password----------
  userData.password = password || (config.default_password as string);

  // ----------Set Faculty role and email----------
  userData.role = 'faculty';
  userData.email = payload.email;

  // ----------Find academic Department info----------
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic Department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // ----------Set Manually Generated Id
    userData.id = await generateFacultyId();

    // ----------Create an user
    const newUser = await User.create([userData], { session });

    // ----------Create a Faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id,  _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference Id

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};

/* --------Logic For Create An Admin------ */
const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // Create an user object
  const userData: Partial<TUser> = {};

  // ----------If Password is not given , use default password----------
  userData.password = password || (config.default_password as string);

  // ----------Set Admin role and email----------
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // ----------Set Manually Generated Id
    userData.id = await generateAdminId();

    // ----------Create an user
    const newUser = await User.create([userData], { session });

    // ----------Create a Student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id,  _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference Id

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
