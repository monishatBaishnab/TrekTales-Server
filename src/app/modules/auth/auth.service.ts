import httpStatus, { BAD_REQUEST } from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TUser } from '../user/user.types';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerIntoDB = async (payload: TUser) => {
  //check user already exists or not
  const existsUser = await User.findOne({ email: payload?.email });
  if (existsUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists.');
  }

  //create new user
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(BAD_REQUEST, 'User creation failed.');
  }

  //create user token
  const token = jwt.sign(
    {
      email: newUser?.email,
      role: newUser?.role,
      _id: newUser?._id,
      isVerified: newUser?.isVerified,
    },
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );
  //return the generated token
  return { token };
};

const loginIntoDB = async (payload: { email: string; password: string }) => {
  //check user already exists or not
  const existsUser = await User.findOne({ email: payload?.email });
  if (!existsUser) {
    throw new AppError(httpStatus.CONFLICT, 'User not found.');
  }

  //validate password
  const validatePassword = await bcrypt.compare(
    payload.password,
    existsUser?.password,
  );
  if (!validatePassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password not matched');
  }
  const user = await User.findOne({ email: payload?.email });

  //create user token
  const token = jwt.sign(
    {
      email: user?.email,
      role: user?.role,
      _id: user?._id,
      isVerified: user?.isVerified,
    },
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );

  return { token };
};

const refetchTokenFromDB = async (userInfo: JwtPayload) => {
  const user = await User.findById({ _id: userInfo?._id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }

  //create user token
  const token = jwt.sign(
    {
      email: user?.email,
      role: user?.role,
      _id: user?._id,
      isVerified: user?.isVerified,
    },
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );

  return token;
};

export const authService = {
  registerIntoDB,
  loginIntoDB,
  refetchTokenFromDB,
};
