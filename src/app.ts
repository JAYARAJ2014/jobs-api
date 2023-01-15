import dotenv from 'dotenv';
import express, { Express } from 'express';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routers/auth';
import { authMiddleware } from './middlewares/auth';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

const app: Express = express();
const connectionString = process.env.MONGO_URI || '';

app.use(express.json());

app.use(authRouter);
app.use(notFound);
app.use(errorHandler);

const startup = async () => {
  try {
    app.listen(port, () => {
      console.log('App Started. Listening Port#: ', port);
    });
  } catch (error) {
    console.log(error);
  }
};

startup();
