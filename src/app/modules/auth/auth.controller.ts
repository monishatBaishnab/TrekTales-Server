import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const register = catchAsync(async (req, res) => {
  const user = await authService.registerIntoDB({
    ...req?.body,
    profilePicture: req?.file?.path ?? '',
  });
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'User Successfully Created.',
    data: user,
  });
});
const login = catchAsync(async (req, res) => {
  const user = await authService.loginIntoDB(req.body);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'User Successfully Logged in.',
    data: user,
  });
});
const refetchToken = catchAsync(async (req, res) => {
  const token = await authService.refetchTokenFromDB(req?.user);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Token refetch success.',
    data: token,
  });
});

export const authController = { register, login, refetchToken };
