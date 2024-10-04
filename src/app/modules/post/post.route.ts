import { Router } from 'express';
import { postController } from './post.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/parseBody';
import validateRequest from '../../middlewares/validateRequest';
import { postSchemas } from './posts.schema';

const router = Router();

router.get('/', postController.getAllPost);

router.get('/:id', postController.getSinglePost);

router.post(
  '/',
  multerUpload.single('image'),
  parseBody,
  validateRequest(postSchemas.createPostSchema),
  postController.createPost,
);

router.put(
  '/:id',
  multerUpload.single('image'),
  parseBody,
  validateRequest(postSchemas.updatePostSchema),
  postController.updatePost,
);

router.put('/:id/upvote', postController.createUpVote);

router.put('/:id/downvote', postController.createDownVote);

router.delete('/:id', postController.createUpVote);

router.get('/states/all', postController.createDownVote);

export const postRoutes = router;
