import { TCourse } from './course.interface';
import { Course } from './course.model';

/* -------------- Create a Course into Data ---------- */
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

/* -------------- Get All Courses From Database ---------- */
const getAllCoursesFromDB = async () => {
  const result = await Course.find();

  return result;
};

/* -------------- Get A Course From Database ---------- */
const getACourseFromDB = async (id: string) => {
  const result = await Course.findById(id);

  return result;
};

/* -------------- Delete A Course From Database ---------- */
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getACourseFromDB,
  deleteCourseFromDB,
};
