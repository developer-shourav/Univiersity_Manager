import { Response } from 'express';
import httpStatus from 'http-status';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  message?: string;
  meta?: TMeta;
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
