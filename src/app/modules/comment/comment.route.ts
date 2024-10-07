import { Router } from 'express';
import { commentController } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { commentSchemas } from './comment.schema';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.get('/', auth(USER_ROLE.ADMIN), commentController.getALlComments);

router.get('/posts/:postId', commentController.getCommentsByPost);

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(commentSchemas.createCommentSchema),
  commentController.createComment,
);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(commentSchemas.updateCommentSchema),
  commentController.updateComment,
);

router.delete('/:id', auth(USER_ROLE.ADMIN), commentController.deleteComment);

export const commentRoutes = router;
