import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const success = false;
  const statusCode = err?.statusCode ?? INTERNAL_SERVER_ERROR;
  const message = 'Something want wrong';
  const error = err?.message ?? '';
  console.log(err);
  //setting default values
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    error,
  });
};

export default globalErrorHandler;
