import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';

/* --------------Create an Academic Semester into Database---------- */
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code !!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

/* --------------Get all Academic Semesters from Database---------- */
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();

  return result;
};

/* --------------Get all Academic Semesters from Database---------- */
const getAnAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  if (!result) {
    throw new Error('Academic Semester Not Found !!');
  }

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getAnAcademicSemesterFromDB,
};
