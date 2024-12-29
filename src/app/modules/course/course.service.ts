import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import { Course } from './course.model';

/* -------------- Create a Course into Data ---------- */
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

/* -------------- Get All Courses From Database ---------- */
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseSearchableQuery = ['title', 'prefix', 'code'];
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableQuery)
    .filter()
    .sort()
    .pagination()
    .fieldFiltering();
  const result = await courseQuery.queryModel;

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
