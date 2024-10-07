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
  console.log(req.body);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'User Successfully Logged in.',
    data: user,
  });
});
const changePassword = catchAsync(async (req, res) => {});

export const authController = { register, login, changePassword };
