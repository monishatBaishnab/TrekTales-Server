import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Something want wrong !!',
    error: '',
  });
};

export default globalErrorHandler;
