import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Post from '../post/posts.model';
import { TComment, TReply } from './comment.types';
import User from '../user/user.model';
import Comment from './comment.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllCommentsFromDB = async (query: Record<string, unknown>) => {
  const commentQuery = new QueryBuilder(
    Comment.find()
      .populate('author')
      .populate({
        path: 'replies',
        match: { isDeleted: { $ne: true } },
        populate: { path: 'author' },
      }),
    query,
  )
    .sort()
    .filter();

  const result = await commentQuery.modelQuery;
  return result;
};

const getCommentsByPostFromDB = async (postId: string) => {
  const comments = await Comment.find({
    post: postId,
    isDeleted: { $ne: true },
  })
    .populate('author')
    .populate('replies.author'); // Populate the author of each reply

  // Filter out replies that are marked as deleted
  const filteredComments = comments.map((comment) => {
    comment.replies = comment?.replies?.filter(
      (reply) => reply.isDeleted !== true,
    );
    return comment;
  });

  return filteredComments;
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

const createReplyIntoDB = async (commentId: string, payload: TReply) => {
  const findComment = await Comment.findById({ _id: commentId });
  if (!findComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  // Create a new reply object
  const newReply: TReply = {
    author: payload.author,
    content: payload.content,
    isDeleted: false,
  };

  // Push the new reply to the replies array of the found comment
  findComment?.replies?.push(newReply);

  // Save the updated comment back to the database
  await findComment.save();
};

const updateReplyIntoDB = async (
  commentId: string,
  replyId: string,
  payload: TReply,
) => {
  // Find the comment by ID

  const findComment = await Comment.findById({ _id: commentId });

  // Check if the comment exists
  if (!findComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  // Find the index of the reply to update
  const replyIndex = findComment?.replies?.findIndex(
    (reply) => reply?._id?.toString() === replyId,
  );

  if (replyIndex == -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Reply not found');
  }

  if (findComment && findComment?.replies !== undefined) {
    findComment.replies[replyIndex as number].content =
      payload.content ?? findComment.replies[replyIndex as number].content;
    findComment.replies[replyIndex as number].isDeleted =
      payload.isDeleted ?? false;
  }

  await findComment.save();

  return findComment;
};

export const commentServices = {
  getAllCommentsFromDB,
  getCommentsByPostFromDB,
  createCommentIntoDB,
  updateCommentFromDB,
  deleteCommentFromDB,
  createReplyIntoDB,
  updateReplyIntoDB,
};
