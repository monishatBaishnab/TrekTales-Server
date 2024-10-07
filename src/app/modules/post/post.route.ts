import { Router } from 'express';
import { postController } from './post.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/parseBody';
import validateRequest from '../../middlewares/validateRequest';
import { postSchemas } from './posts.schema';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.get('/', postController.getAllPost);

router.get('/:id', postController.getSinglePost);

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.single('image'),
  parseBody,
  validateRequest(postSchemas.createPostSchema),
  postController.createPost,
);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.single('image'),
  parseBody,
  validateRequest(postSchemas.updatePostSchema),
  postController.updatePost,
);

router.put(
  '/:id/upvote',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.createUpVote,
);

router.put(
  '/:id/downvote',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.createDownVote,
);

router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.USER), postController.createUpVote);

router.get('/states/all', postController.createDownVote);

export const postRoutes = router;
