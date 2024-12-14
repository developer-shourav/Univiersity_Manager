import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

/* ----------------------Create A Student----------------- */
const createStudent = catchAsync(async (req, res) => {
  const { password, student: createNewStudentData } = req.body;

  // will call service function to send this data
  const result = await UserServices.createStudentIntoDB(
    password,
    createNewStudentData,
  );

  sendResponse(res, {
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
