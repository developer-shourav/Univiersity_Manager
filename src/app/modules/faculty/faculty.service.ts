import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';

/* --------Logic For Get All Faculties From Database------ */
const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultySearchFields = [
    'email',
    'id',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
  ];

  // Search, Filter, Sort, Pagination and Field Filtering Using Query Chaining Method
  const studentQuery = new QueryBuilder(Faculty.find(), query)
    .search(facultySearchFields)
    .filter()
    .sort()
    .pagination()
    .fieldFiltering();
  const result = await studentQuery.queryModel;
  return result;
};

/* --------Logic For Get A Faculty From Database------ */
const getAFacultyFromDB = async (id: string) => {
  // using query
  const result = await Faculty.findById(id)
    .populate('user')
    .populate('academicDepartment');

  return result;
};

/* --------Logic For Update A Faculty From Database------ */
const updateAFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

/* --------Logic For Delete A Faculty------ */
const deleteAFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isFacultyAlreadyDeleted = await Faculty.findOne({
      id,
      isDeleted: { $eq: true },
    });
    if (isFacultyAlreadyDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not found');
    }

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getAFacultyFromDB,
  updateAFacultyFromDB,
  deleteAFacultyFromDB,
};
