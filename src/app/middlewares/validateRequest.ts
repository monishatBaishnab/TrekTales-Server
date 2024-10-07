import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    console.log(req.body, 'from validate req');
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
