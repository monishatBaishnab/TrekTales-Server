import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from '../user/user.schema';

const router = Router();

router.post(
  '/register',
  validateRequest(userSchema.createUserSchema),
  authController.register,
);
router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);

export const authRouter = router;
