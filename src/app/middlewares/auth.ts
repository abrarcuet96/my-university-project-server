import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid:
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { userRole, userId, iat } = decoded;
    //   checking if the user is exist
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }
    //   check if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
    }
    //   check if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    // decoded undefined
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
