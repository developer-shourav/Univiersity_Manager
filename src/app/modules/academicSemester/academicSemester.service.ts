import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

/* --------------Create an Academic Semester into Database---------- */
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code !!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

/* --------------Get all Academic Semesters from Database---------- */
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();

  return result;
};

/* --------------Get An Academic Semester from Database---------- */
const getAnAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester Not Found !!');
  }

  return result;
};

/* --------------Update An Academic Semester ---------- */
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getAnAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
