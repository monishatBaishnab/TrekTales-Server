import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { verifyToken } from '../utils/verifyJWT';
import { USER_ROLE } from '../modules/user/user.constants';
import catchAsync from '../utils/catchAsync';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    if (user?.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role.toUpperCase())) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    console.log(decoded);
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
