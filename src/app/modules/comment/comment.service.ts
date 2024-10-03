import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Post from '../post/posts.model';
import { TComment } from './comment.types';
import User from '../user/user.model';
import Comment from './comment.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllCommentsFromDB = async (query: Record<string, unknown>) => {
  const commentQuery = new QueryBuilder(
    Comment.find().populate('author'),
    query,
  )
    .sort()
    .filter();

  const result = await commentQuery.modelQuery;
  return result;
};

const getCommentsByPostFromDB = async (postId: string) => {
  const result = await Comment.find({ post: postId }).populate('author');
  return result;
};

const createCommentIntoDB = async (payload: TComment) => {
  const findPost = await Post.findById({ _id: payload?.post });
  if (!findPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found.');
  }
  const findAuthor = await User.findById({ _id: payload.author });
  if (!findAuthor) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found.');
  }

  const result = await Comment.create(payload);
  return result;
};

const updateCommentFromDB = async (id: string, payload: Partial<TComment>) => {
  const findComment = await Comment.findById({ _id: id });
  if (!findComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found.');
  }

  const result = await Comment.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCommentFromDB = async (id: string) => {
  const findComment = await Comment.findById({ _id: id });
  if (!findComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found.');
  }

  await Comment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return {};
};

export const commentServices = {
  getAllCommentsFromDB,
  getCommentsByPostFromDB,
  createCommentIntoDB,
  updateCommentFromDB,
  deleteCommentFromDB,
};
