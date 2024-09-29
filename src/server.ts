import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

const bootstrap = async () => {
  await mongoose.connect(config.database_url as string, {
    dbName: 'trek_tales',
  });
  console.log('Database connected successfully.');
  server = app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
  });
};

bootstrap();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
