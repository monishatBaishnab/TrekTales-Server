import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
import { Types } from 'mongoose';

const updateUser = catchAsync(async (req, res) => {
  const result = await userServices.updateUserDB(
    req?.params?.id,
    req?.body,
    req?.file,
    req?.user
  );

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
  const result = await userServices.getAllAuthorsDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Authors retrieved successfully.',
  });
});

const getSingleAuthor = catchAsync(async (req, res) => {
  const result = await userServices.getSingleAuthorDB(req?.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Author retrieved successfully.',
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

const createFollower = catchAsync(async (req, res) => {
  const { author } = req?.body;
  const result = await userServices.followAuthorInDB(
    author as string,
    req?.user?._id as Types.ObjectId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Follow added successfully.',
  });
});

export const userController = {
  updateUser,
  getAllUsers,
  getPopularUsers,
  getSingleUser,
  getAllAuthors,
  getSingleAuthor,
  createFollower
};
