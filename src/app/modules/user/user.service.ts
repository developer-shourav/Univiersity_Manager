import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utiles';

/* --------Logic For Create an Student------ */
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create an user object
  const userData: Partial<TUser> = {};

  // ----------If Password is not given , use default password----------
  userData.password = password || (config.default_password as string);

  // ----------Set student role----------
  userData.role = 'student';

  // ----------Find academic semester info----------
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // ----------Set Manually Generated Id
  userData.id = await generateStudentId(admissionSemester);

  // ----------Create an user
  const newUser = await User.create(userData);

  // ----------Create a Student
  if (Object.keys(newUser).length) {
    // set id,  _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // Reference Id

    const newStudent = await Student.create(payload);

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
