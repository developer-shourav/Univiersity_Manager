import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

/* --------Logic For Get All Students From Database------ */
const getAllStudentsFromDB = async (queries: Record<string, unknown>) => {
  // ---Logic For Search Student---
  const studentSearchFields = [
    'email',
    'name.firstName',
    'name.lastName',
    'presentAddress',
  ];
  let searchTerm = '';
  if (queries?.searchTerm) {
    searchTerm = queries?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // ---Logic For Filter Student---
  const queryObject = { ...queries };
  const excludedFields = ['searchTerm', 'sortBy', 'limit', 'page', 'fields'];
  excludedFields.forEach((field) => delete queryObject[field]);

  const filterQuery = searchQuery
    .find(queryObject)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // ---Logic For Sort Student---
  let sort = '-createdAt';
  if (queries?.sortBy) {
    sort = queries?.sortBy as string;
  }

  const sortQuery = filterQuery.sort(sort);

  // ---Logic For Limit and Pagination Student Data ---
  let pageValue = 1;
  let limitValue = 10;
  let skipValue = 0;
  if (queries?.limit) {
    limitValue = Number(queries?.limit);
  }
  if (queries?.page) {
    pageValue = Number(queries?.page);
  }

  skipValue = (pageValue - 1) * limitValue;

  const paginateQuery = sortQuery.skip(skipValue);
  const limitQuery = paginateQuery.limit(limitValue);

  // ------(Optional) field limiting------
  let fields = '-__v'; // set default fields and using - to exclude version field
  if (queries?.fields) {
    fields = (queries?.fields as string).split(',').join(' ');
  }

  const fieldFilteredQuery = await limitQuery.select(fields);

  // Final Query Result
  const result = fieldFilteredQuery;
  return result;
};

/* --------Logic For Get A Students From Database------ */
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

/* --------Logic For Update A Students From Database------ */
const updateAStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

/* --------Logic For Delete A Student------ */
const deleteAStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isStudentExist = await Student.findOne({
      id,
      isDeleted: { $eq: true },
    });
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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getAStudentFromDB,
  updateAStudentFromDB,
  deleteAStudentFromDB,
};
