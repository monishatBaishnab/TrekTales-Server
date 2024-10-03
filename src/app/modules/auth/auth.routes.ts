import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from '../user/user.schema';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/register',
  multerUpload.single('image'),
  // validateRequest(userSchema.registerUserSchema),
  authController.register,
);

router.post(
  '/login',
  validateRequest(userSchema.loginUserSchema),
  authController.login,
);

router.post('/change-password', authController.changePassword);

export const authRouter = router;
