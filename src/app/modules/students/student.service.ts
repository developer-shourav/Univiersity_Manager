import { Student } from './student.model';

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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
