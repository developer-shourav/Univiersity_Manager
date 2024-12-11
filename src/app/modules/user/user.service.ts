import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';

/* --------Logic For Create an Student------ */
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create an user object
  const userData: Partial<TUser> = {};

  // If Password is not given , use default password
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';

  // Set Manually Generated Id
  userData.id = '2030100001';

  // Create an user
  const newUser = await User.create(userData);

  // Create a Student
  if (Object.keys(newUser).length) {
    // set id,  _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // Reference Id

    const newStudent = await Student.create(studentData);

    return newStudent;
  }

};

export const UserServices = {
  createStudentIntoDB,
};
