import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { postRoutes } from '../modules/post/post.route';
import { commentRoutes } from '../modules/comment/comment.route';
import { paymentRoutes } from '../modules/payment/payment.route';
import { userRoutes } from '../modules/user/user.route';

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRouter,
  },
  {
    path: '/posts',
    routes: postRoutes,
  },
  {
    path: '/comments',
    routes: commentRoutes,
  },
  {
    path: '/payments',
    routes: paymentRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
];

const router = Router();

moduleRoutes?.map(({ path, routes }) => router.use(path, routes));

export const appRoutes = router;
