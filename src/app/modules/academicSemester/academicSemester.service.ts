import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

/* --------------Create an Academic Semester into Database---------- */
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
