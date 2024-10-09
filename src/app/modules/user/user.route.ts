import { Router } from 'express';
import { userController } from './user.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/parseBody';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from './user.schema';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constants';

const router = Router();

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.single('image'),
  parseBody,
  validateRequest(userSchema.updateUserSchema),
  userController.updateUser,
);

router.get('/', auth(USER_ROLE.ADMIN), userController.getAllUsers);

router.get('/authors/:id', userController.getSingleAuthor);

router.get('/authors', userController.getAllAuthors);

router.get('/popular-authors', userController.getPopularUsers);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userController.getSingleUser,
);
router.post(
  '/follow',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userController.createFollower,
);

export const userRoutes = router;
