import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TPost } from './post.types';
import Post from './posts.model';
import Comment from '../comment/comment.model';
import console from 'console';

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

const getTodayStates = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // Fetch total posts
  const totalPosts = await Post.countDocuments({ isDeleted: false });

  // Fetch total comments
  const totalComments = await Comment.countDocuments({ isDeleted: false });

  // Fetch today's posts
  const todayPosts = await Post.countDocuments({
    createdAt: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
    isDeleted: false,
  }).select('-isDeleted -__v');

  // Return combined statistics
  return {
    totalPosts,
    totalComments,
    todayPosts,
  };
};

const createUpVoteIntoDB = async (id: string, payload: { user: string }) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  const existingVote = post.votes?.find((vote) => vote.user === payload.user);

  // Check if the user has already upvoted
  if (existingVote) {
    if (existingVote.vote === 'up') {
      throw new Error('You have already upvoted this post');
    }
    if (existingVote.vote === 'down') {
      post.votes = post.votes.filter((vote) => vote.user !== payload.user);
    }
  } else {
    if (!post.votes) {
      post.votes = [];
    }
  }

  // Add the upvote
  post.votes.push({ vote: 'up', user: payload.user });
  await post.save();
  console.log(post);
  return post;
};

const createDownVoteIntoDB = async (id: string, payload: { user: string }) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  const existingVote = post.votes?.find((vote) => vote.user === payload.user);

  // Check if the user has already downvoted
  if (existingVote) {
    if (existingVote.vote === 'down') {
      throw new Error('You have already downvoted this post');
    }
    if (existingVote.vote === 'up') {
      // Remove upvote and add downvote
      post.votes = post.votes.filter((vote) => vote.user !== payload.user);
    }
  } else {
    // If no existing vote, initialize the votes array if it's empty
    if (!post.votes) {
      post.votes = [];
    }
  }

  // Add the downvote
  post.votes.push({ vote: 'down', user: payload.user });
  await post.save();
  console.log(post);
  return post;
};

export const postService = {
  getAllPostFromDB,
  getSinglePostFromDB,
  createPostIntoDB,
  updatePostFromDB,
  deletePostsFromDB,
  getTodayStates,
  createDownVoteIntoDB,
  createUpVoteIntoDB,
};
