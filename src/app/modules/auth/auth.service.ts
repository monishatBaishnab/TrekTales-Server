import { BAD_REQUEST } from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TUser } from '../user/user.types';
import jwt from 'jsonwebtoken';
const registerIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(BAD_REQUEST, 'User creation failed.');
  }

  const token = jwt.sign(
    { email: newUser?.email, role: newUser?.role, _id: newUser?._id },
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );
  return { token };
};
const loginIntoDB = async (payload: { email: string; password: string }) => {};
const changePasswordIntoDB = async (id: string, password: string) => {};

export const authService = {
  registerIntoDB,
  loginIntoDB,
  changePasswordIntoDB,
};
