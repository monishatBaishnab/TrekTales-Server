import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { postService } from './post.service';

const getAllPost = catchAsync(async (req, res) => {
  const posts = await postService.getAllPostFromDB(req?.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts Retrieved Successfully.',
    data: posts,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const post = await postService.getSinglePostFromDB(id, req?.user?.isVerified);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Retrieved Successfully.',
    data: post,
  });
});

const createPost = catchAsync(async (req, res) => {
  const newPost = await postService.createPostIntoDB(
    req?.body,
    req?.file?.path,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Created Successfully.',
    data: newPost,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const updatedPost = await postService.updatePostFromDB(
    id,
    req?.body,
    req?.file?.path,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Updated Successfully.',
    data: updatedPost,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const deletedPost = await postService.deletePostsFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Deleted Successfully.',
    data: deletedPost,
  });
});

const getStates = catchAsync(async (req, res) => {
  const states = await postService.getTodayStates();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Deleted Successfully.',
    data: states,
  });
});

const createUpVote = catchAsync(async (req, res) => {
  const states = await postService.createUpVoteIntoDB(
    req?.params?.id,
    req?.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Upvoted Successfully.',
    data: states,
  });
});

const createDownVote = catchAsync(async (req, res) => {
  const states = await postService.createDownVoteIntoDB(
    req?.params?.id,
    req?.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Downvoted Successfully.',
    data: states,
  });
});
const getUpvotes = catchAsync(async (req, res) => {
  const upVotes = await postService.getUpvotes(req?.params?.authorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Upvote Retrieved Successfully.',
    data: upVotes,
  });
});

export const postController = {
  getAllPost,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getStates,
  createUpVote,
  createDownVote,
  getUpvotes
};
