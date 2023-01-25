import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routers/auth';
import { authMiddleware } from './middlewares/auth-middleware';
import { StatusCodes } from 'http-status-codes';
import { jobsRouter } from './routers/jobs';
import { connectDatabase } from './db/connect';
import helmet from 'helmet';
import cors from 'cors';
import {rateLimit} from 'express-rate-limit'
import xss from 'xss-clean';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI || '';

const app: Express = express();
const baseUrl: string = `/api/v1`;
app.use(express.json());
app.use(rateLimit());
app.use(helmet());
app.use(cors());
app.use(xss())

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/jobs`, authMiddleware, jobsRouter);

app.get('/', (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({ message: 'Jobs API' });
});

app.use(notFound);
app.use(errorHandler);

const startup = async () => {
  try {
    await connectDatabase(mongoUri);

    app.listen(port, () => {
      console.log('App Started. Listening Port#: ', port);
    });
  } catch (error) {
    console.log(error);
  }
};

startup();
