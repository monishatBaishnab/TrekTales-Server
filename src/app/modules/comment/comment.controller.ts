import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { commentServices } from './comment.service';

const getALlComments = catchAsync(async (req, res) => {
  const comments = await commentServices.getAllCommentsFromDB(req?.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments Retrieved Successfully.',
    data: comments,
  });
});

const getCommentsByPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const comments = await commentServices.getCommentsByPostFromDB(postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments Retrieved Successfully.',
    data: comments,
  });
});

const createComment = catchAsync(async (req, res) => {
  const newComment = await commentServices.createCommentIntoDB(req?.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments Created Successfully.',
    data: newComment,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const updatedComment = await commentServices.updateCommentFromDB(
    id,
    req?.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments Updated Successfully.',
    data: updatedComment,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const deletedComment = await commentServices.deleteCommentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments Deleted Successfully.',
    data: deletedComment,
  });
});

const createReply = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const result = await commentServices.createReplyIntoDB(id, req?.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reply Created Successfully.',
    data: result,
  });
});
const updateReply = catchAsync(async (req, res) => {
  const { id, replyId } = req?.params;
  const result = await commentServices.updateReplyIntoDB(
    id,
    replyId,
    req?.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reply Updated Successfully.',
    data: result,
  });
});

export const commentController = {
  getALlComments,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  createReply,
  updateReply,
};
