import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from './user.model';
import { TUser } from './user.types';
import QueryBuilder from '../../builder/QueryBuilder';
import Post from '../post/posts.model';

const updateUserDB = async (
  id: string,
  payload: Partial<TUser>,
  file: Express.Multer.File | undefined,
) => {
  console.log(payload, 'from user service');
  const findUser = await User.findById(id);
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  if (findUser?.isBlocked || findUser?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const deleteAbleFields: (keyof TUser)[] = [
    'isVerified',
    'isBlocked',
    'isDeleted',
    'role',
  ];
  deleteAbleFields?.map((field) => delete payload?.[field]);

  const userData = {
    ...payload,
    profilePicture: file ? file.path : findUser?.profilePicture,
  };

  const result = await User.findByIdAndUpdate({ _id: id }, userData, {
    new: true,
  });

  return result;
};

const getAllUsersDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().select('-password'), query);

  const result = await userQuery.modelQuery;
  return result;
};

const getAllAuthorsDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(
    User.find({ role: { $ne: 'admin' } }).select(
      '-role -isDeleted -password -isBlocked',
    ),
    query,
  );

  const authors = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { authors, meta };
};

const getSingleAuthorDB = async (id: string) => {
  const author = await User.findById(id).select(
    '-role -isDeleted -password -isBlocked',
  );

  const posts = await Post.find({ author: id });

  return { author, posts };
};

const getPopularUsersDB = async () => {
  const result = await User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'author',
        as: 'posts',
      },
    },
    {
      $addFields: {
        totalUpvotes: { $sum: '$posts.upvotes' },
      },
    },
    {
      $sort: { totalUpvotes: -1 },
    },
    {
      $limit: 3,
    },
    {
      $project: {
        posts: 0,
        role: 0,
        isDeleted: 0,
        password: 0,
        isBlocked: 0,
      },
    },
  ]);
  return result;
};

const getSingleUserDB = async (id: string) => {
  console.log(id);
  const result = await User.findById(id).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  if (result?.isBlocked || result?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  return result;
};

export const userServices = {
  updateUserDB,
  getAllUsersDB,
  getAllAuthorsDB,
  getPopularUsersDB,
  getSingleUserDB,
  getSingleAuthorDB,
};
