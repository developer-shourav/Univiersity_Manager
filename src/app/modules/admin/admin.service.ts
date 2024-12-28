import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';

/* --------Logic For Get All Admins From Database------ */
const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
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
  const studentQuery = new QueryBuilder(Admin.find(), query)
    .search(facultySearchFields)
    .filter()
    .sort()
    .pagination()
    .fieldFiltering();
  const result = await studentQuery.queryModel;
  return result;
};

/* --------Logic For Get An Admin From Database------ */
const getAnAdminFromDB = async (id: string) => {
  // using query
  const result = await Admin.findOne({ id }).populate('user');

  return result;
};

/* --------Logic For Update An Admin From Database------ */
const updateAnAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

/* --------Logic For Delete An Admin------ */
const deleteAnAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isFacultyExist = await Admin.findOne({
      id,
      isDeleted: { $eq: true },
    });
    if (!isFacultyExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admin not found');
    }

    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
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

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const adminServices = {
  getAllAdminsFromDB,
  getAnAdminFromDB,
  updateAnAdminFromDB,
  deleteAnAdminFromDB,
};
