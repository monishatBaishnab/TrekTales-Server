import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { appRoutes } from './app/routes';
import { OK } from 'http-status';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      'https://trek-tales-client.vercel.app',
      'http://localhost:3000',
      'https://trek-tales-client-h1lo9spxj-monishats-projects.vercel.app',
    ],
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: OK,
    message: 'TrekTales Server Running Smoothly !',
  });
});

app.use('/api/v1', appRoutes);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
