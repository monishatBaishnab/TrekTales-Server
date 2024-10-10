import path from 'path';
import { TPayment } from './payment.types';
import { promises as fs } from 'fs';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import axios from 'axios';
import config from '../../config';
import Payment from './payment.model';
import User from '../user/user.model';
import { generateTransactionId, initiatePayment } from './payment.utils';
import Post from '../post/posts.model';
import Comment from '../comment/comment.model';
const createPaymentIntoDB = async (payload: TPayment) => {
  const user = await User.findById({ _id: payload?.user });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const trans_id = generateTransactionId();

  const paymentData = {
    trans_id,
    user: payload?.user,
    amount: 1050,
  };

  await Payment.create(paymentData);

  const paymentInfo = {
    amount: 10,
    trans_id,
    customer: {
      name: user?.name,
      email: user?.email,
    },
  };

  const payment = await initiatePayment(paymentInfo);

  return payment;
};

const successPaymentIntoAmarpay = async (trans_id: string) => {
  const filePath = path.join(__dirname, '../../views/success.html');

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const checkPayment = await axios.get(
      `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${trans_id}&store_id=${config.store_id}&signature_key=${config.signature_key}&type=json`,
    );

    if (checkPayment?.data?.pay_status === 'Successful') {
      const updatedPayment = await Payment.findOneAndUpdate(
        { trans_id },
        { status: 'complete' },
        { new: true },
      );
      await User.findOneAndUpdate(
        { _id: updatedPayment?.user },
        { isVerified: true },
      );
    }

    return data;
  } catch (error) {
    throw new AppError(Number(httpStatus[500]), 'Error reading file');
  }
};

const failedPaymentIntoAmarpay = async (trans_id: string) => {
  const filePath = path.join(__dirname, '../../views/failed.html');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    await Payment.updateOne({ trans_id }, { status: 'pending' });
    return data;
  } catch (error) {
    throw new AppError(Number(httpStatus[500]), 'Error reading file');
  }
};

const getPayments = async () => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1,
  );

  const data = await Payment.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      },
    },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        amount: 1,
      },
    },
    {
      $group: {
        _id: '$formattedDate',
        totalPayments: { $sum: '$amount' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: '$totalPayments',
      },
    },
  ]);

  // Fetch the total payment amount using aggregation
  const totalPayments = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  // Fetch total user count using countDocuments
  const totalUsers = await User.countDocuments({});

  // Fetch total post count using countDocuments
  const totalPosts = await Post.countDocuments({});

  // Fetch total comment count using countDocuments
  const totalComments = await Comment.countDocuments({});

  // Format the result
  const formattedSummary = {
    totalPayments: totalPayments.length > 0 ? totalPayments[0].totalAmount : 0,
    totalUsers,
    totalPosts,
    totalComments,
    states: data,
  };

  return formattedSummary;
};

export const paymentService = {
  createPaymentIntoDB,
  successPaymentIntoAmarpay,
  failedPaymentIntoAmarpay,
  getPayments,
};
