import { Router } from 'express';
import { userController } from './user.controller';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.put(
  '/:id',
  multerUpload.single('image'),
  userController.updateUser,
);

router.get('/', userController.getAllUsers);

router.get('/authors/:id', userController.getSingleAuthor);

router.get('/authors', userController.getAllAuthors);

router.get('/popular-authors', userController.getPopularUsers);

router.get('/:id', userController.getSingleUser);

export const userRoutes = router;
