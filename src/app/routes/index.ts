import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRouter,
  },
];

const router = Router();

moduleRoutes?.map(({ path, routes }) => router.use(path, routes));

export const appRoutes = router;
