import { Router } from 'express';
import { postController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { postSchemas } from './posts.schema';

const router = Router();

router.get('/', postController.getAllPost);

router.get('/:id', postController.getSinglePost);

router.post(
  '/',
  validateRequest(postSchemas.createPostSchema),
  postController.createPost,
);

router.put(
  '/:id',
  validateRequest(postSchemas.updatePostSchema),
  postController.updatePost,
);

router.delete('/:id', postController.deletePost);

export const postRoutes = router;
