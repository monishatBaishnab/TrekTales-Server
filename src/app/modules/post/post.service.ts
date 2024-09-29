import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TPost } from './post.types';
import Post from './posts.model';

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('author'), query)
    .search(['title', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id).populate('author');
  return result;
};

const createPostIntoDB = async (payload: TPost) => {
  const findAuthor = await User.findById({ _id: payload?.author });
  if (!findAuthor) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Author not found.');
  }

  const postData = {
    ...payload,
    upvotes: 0,
    downvotes: 0,
    isDeleted: false,
  };

  const result = await Post.create(postData);
  return result;
};

const updatePostFromDB = async (id: string, payload: Partial<TPost>) => {
  const findPost = await Post.findById(id);
  if (!findPost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post not found.');
  }

  if (findPost.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post not found.');
  }

  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletePostsFromDB = async (id: string) => {
  const findPost = await Post.findById(id);
  if (!findPost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post not found.');
  }

  if (findPost.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post not found.');
  }

  await Post.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return {};
};

export const postService = {
  getAllPostFromDB,
  getSinglePostFromDB,
  createPostIntoDB,
  updatePostFromDB,
  deletePostsFromDB,
};
