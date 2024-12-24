import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

/* --------Logic For Get All Students------ */
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

/* --------Logic For Get A Students------ */
const getAStudentFromDB = async (id: string) => {
  // using query
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // using aggregation
  // const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

/* --------Logic For Delete A Student------ */
const deleteAStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isStudentExist = await Student.findOne({ id, isDeleted: { $eq: true } });
    if (!isStudentExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student not found');
    }

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
