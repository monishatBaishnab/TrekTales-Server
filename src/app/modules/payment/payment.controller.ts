import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
  const result = await paymentService.createPaymentIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your Payment Created Successfully.',
    data: result,
  });
});
const successPayment = catchAsync(async (req, res) => {
  const { trans_id } = req?.query;
  const result = await paymentService.successPaymentIntoAmarpay(
    trans_id as string,
  );
  
  res.send(result);
});
const failedPayment = catchAsync(async (req, res) => {
  const { trans_id } = req?.query;
  const result = await paymentService.failedPaymentIntoAmarpay(
    trans_id as string,
  );
  
  res.send(result);
});

export const paymentController = {
  createPayment,
  successPayment,
  failedPayment,
};
