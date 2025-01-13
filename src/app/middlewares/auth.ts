import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const TOKEN = req.headers.authorization;
    /* -------Checking the token is sent form client */
    if (!TOKEN) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    /* -------Checking the token validity */
    jwt.verify(
      TOKEN,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
        }

        // decoded
        req.user = decoded as JwtPayload;

        next();
      },
    );
  });
};

export default auth;
