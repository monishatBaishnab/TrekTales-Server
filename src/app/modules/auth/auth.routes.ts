import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from '../user/user.schema';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { parseBody } from '../../middlewares/parseBody';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/register',
  multerUpload.single('image'),
  parseBody,
  validateRequest(userSchema.registerUserSchema),
  authController.register,
);

router.post(
  '/login',
  // validateRequest(userSchema.loginUserSchema),
  authController.login,
);
router.get(
  '/refetch-token',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  authController.refetchToken,
);

export const authRouter = router;
