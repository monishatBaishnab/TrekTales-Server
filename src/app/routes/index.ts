import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { postRoutes } from '../modules/post/post.route';

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRouter,
  },
  {
    path: '/posts',
    routes: postRoutes,
  },
];

const router = Router();

moduleRoutes?.map(({ path, routes }) => router.use(path, routes));

export const appRoutes = router;
