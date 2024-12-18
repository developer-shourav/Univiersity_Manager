import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

/* ------------ Create An Academic Faculty into Database ----------- */
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

/* ------------ Get All Academic Faculties From Database ----------- */
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

/* ------------ Get Single Academic Faculty from Database ---------- */
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

/* ------------ Update an Academic Faculty  ---------- */
const updateAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};
