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
  const post = await postService.getSinglePostFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Retrieved Successfully.',
    data: post,
  });
});

const createPost = catchAsync(async (req, res) => {
  const newPost = await postService.createPostIntoDB(req?.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Created Successfully.',
    data: newPost,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const updatedPost = await postService.updatePostFromDB(id, req?.body);

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

export const postController = {
  getAllPost,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};