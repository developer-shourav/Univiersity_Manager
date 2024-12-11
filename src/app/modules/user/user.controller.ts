import { Request, Response } from 'express';
import { UserServices } from './user.service';

/* ----------------------Create A Student----------------- */
const createStudent = async (req: Request, res: Response) => {
  try {
    const { password,  student: createNewStudentData } = req.body;

    // -------------Validate Data Using Use Zod Validation-----------

    // const zodValidationResult = studentValidationSchema.parse(createNewStudentData);

    // will call service function to send this data
    const result = await UserServices.createStudentIntoDB(password, createNewStudentData);

    // Send Response to the frontend
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    // If error occurs then give error response to the Fronted
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};
