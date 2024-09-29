import { Router } from 'express';
import { commentController } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { commentSchemas } from './comment.schema';

const router = Router();

router.get('/', commentController.getALlComments);

router.get('/posts/:id', commentController.getCommentsByPost);

router.post(
  '/',
  validateRequest(commentSchemas.createCommentSchema),
  commentController.createComment,
);

router.put(
  '/:id',
  validateRequest(commentSchemas.updateCommentSchema),
  commentController.updateComment,
);

router.delete('/:id', commentController.deleteComment);

export const commentRoutes = router;
