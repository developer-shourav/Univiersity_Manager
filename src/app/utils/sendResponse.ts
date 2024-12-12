import { Response } from 'express';
import httpStatus from 'http-status';

type TResponse<T> = {
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
