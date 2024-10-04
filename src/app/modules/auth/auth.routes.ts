import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from '../user/user.schema';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/register',
  validateRequest(userSchema.registerUserSchema),
  authController.register,
);

router.post(
  '/login',
  auth(USER_ROLE.USER),
  validateRequest(userSchema.loginUserSchema),
  authController.login,
);

router.post('/change-password', authController.changePassword);

export const authRouter = router;
