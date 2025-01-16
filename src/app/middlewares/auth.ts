import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
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

        const role = (decoded as JwtPayload).role;

        /* -------Checking the user Role validity for the request */
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Unauthorized! Your are not permitted.',
          );
        }

        // decoded
        req.user = decoded as JwtPayload;

        next();
      },
    );
  });
};

export default auth;
