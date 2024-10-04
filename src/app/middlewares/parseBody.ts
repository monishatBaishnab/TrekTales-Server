import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';

export const parseBody = catchAsync(async (req, res, next) => {
  if (!req?.body?.data) {
    throw new AppError(400, 'Please provide data in the body under data key');
  }
  const data = JSON.parse(req?.body?.data);
  req.body = data;
  next();
});
