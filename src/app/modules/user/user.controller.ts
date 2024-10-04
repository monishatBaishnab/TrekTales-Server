import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const updateUser = catchAsync(async (req, res) => {
  const result = await userServices.updateUserDB(req?.params?.id, req?.body?.data, req?.file);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'User updated successfully.',
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Users retrieved successfully.',
  });
});

const getAllAuthors = catchAsync(async (req, res) => {
  const result = await userServices.getPopularUsersDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Authors retrieved successfully.',
  });
});

const getPopularUsers = catchAsync(async (req, res) => {
  const result = await userServices.getPopularUsersDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Popular authors retrieved successfully.',
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await userServices.getSingleUserDB(req?.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'User retrieved successfully.',
  });
});

export const userController = {
  updateUser,
  getAllUsers,
  getPopularUsers,
  getSingleUser,
  getAllAuthors,
};
