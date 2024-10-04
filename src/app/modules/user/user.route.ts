import { Router } from 'express';
import { userController } from './user.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/parseBody';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from './user.schema';

const router = Router();

router.put(
  '/:id',
  multerUpload.single('image'),
  parseBody,
  validateRequest(userSchema.updateUserSchema),
  userController.updateUser,
);

router.get('/', userController.getAllUsers);

router.get('/authors/:id', userController.getSingleAuthor);

router.get('/authors', userController.getAllAuthors);

router.get('/popular-authors', userController.getPopularUsers);

router.get('/:id', userController.getSingleUser);

export const userRoutes = router;
