import { Student } from '../student.modle';
import { TStudent } from './student.interface';

/* --------Logic For Create an Student------ */
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(studentData); // Builtin static method
  //------------------- Custom instance method (Built in instance method provided by Mongoose) ------------
  /*
  const student = new Student(studentData); // Create an instance

  if (await student.isUserExists(studentData?.id)) {
    throw new Error('User already exist!');
  }

  const result = await student.save(); // 
  return result; 
  */

  //------------------- Static instance method (Built in instance method provided by Mongoose) ------------

  if (await Student.isUserExists(studentData?.id)) {
    throw new Error('User already exist!');
  }

  const result = await Student.create(studentData);

  return result;
};

/* --------Logic For Get All Students------ */
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

/* --------Logic For Get A Students------ */
const getAStudentFromDB = async (id: string) => {
  // using query
  // const result = await Student.findOne({ id });

  // using aggregation
  const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

/* --------Logic For Delete A Student------ */
const deleteAStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
