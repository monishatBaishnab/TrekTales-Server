import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from './user.model';
import { TUser } from './user.types';
import QueryBuilder from '../../builder/QueryBuilder';
import Post from '../post/posts.model';
import { Types } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

const updateUserDB = async (
  id: string,
  payload: Partial<TUser>,
  file: Express.Multer.File | undefined,
  currentUser: JwtPayload,
) => {
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

  for (const field of deleteAbleFields) {
    if (field in payload) {
      if (currentUser?.role !== 'admin') {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Your have no access in this operation.',
        );
      }
    }
  }

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
  const userQuery = new QueryBuilder(
    User.find().select('-password'),
    query,
  ).paginate();

  const users = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { users, meta };
};

const getAllAuthorsDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(
    User.find().select('-role -isDeleted -password -isBlocked'),
    query,
  )
    .paginate()
    .fields();
  console.log(query);
  const authors = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { authors, meta };
};

const getSingleAuthorDB = async (id: string) => {
  const author = await User.findById(id).select('-password');

  const posts = await Post.find({ author: id });

  return { author, posts };
};

const getPopularUsersDB = async () => {
  const result = await User.aggregate([
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
  const user = await User.findById(id)
    .populate({
      path: 'followers',
      select: 'profilePicture name email isVerified role dateOfBirth',
    })
    .select('-password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  if (user?.isBlocked || user?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const followedUsers = await User.find({
    followers: { $in: [id] },
  }).select('profilePicture name email isVerified role dateOfBirth');

  return { user, followedUsers: followedUsers?.length ? followedUsers : [] };
};

const followAuthorInDB = async (
  authorId: string,
  followerId: Types.ObjectId,
) => {
  const author = await User.findByIdAndUpdate(
    authorId,
    { $addToSet: { followers: followerId } }, // Add follower only if not already present
    { new: true }, // Return the updated document
  );

  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found.');
  }

  return { author: author?._id };
};

export const userServices = {
  updateUserDB,
  getAllUsersDB,
  getAllAuthorsDB,
  getPopularUsersDB,
  getSingleUserDB,
  getSingleAuthorDB,
  followAuthorInDB,
};
