import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const TOKEN = req.headers.authorization;
    /* -------Checking the token is sent form client */
    if (!TOKEN) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    /* -------Checking the token validity */
    const decoded = jwt.verify(
      TOKEN,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // ----------Check if the user is exist
    const user = await User.isUserExistByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // --------- checking if the user already deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
    }

    // --------- checking if the user is Blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked!');
    }

    // ------- checking if the token issued before password change
    if (
      user.passwordChangedAt &&
      User.isJwtTokenIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized!! Your are not permitted💀',
      );
    }

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
  });
};

export default auth;
