import { Router } from 'express';

import 'express-async-errors';
import { handleAsync } from '../middlewares/async-handler';
import { authHandler } from '../handlers/auth-handler';
import { authMiddleware } from '../middlewares/auth-middleware';
import { jobsHandler } from '../handlers/jobs-handler';

export const jobsRouter: Router = Router();

jobsRouter.get('/', handleAsync(jobsHandler.getAllJobs));
jobsRouter.post('/jobs', handleAsync(jobsHandler.createJob));
// jobsRouter.get('/jobs/:id', handleAsync(jobsHandler.getJob));
// jobsRouter.post('/jobs', handleAsync(jobsHandler.deleteJob));
// jobsRouter.post('/jobs', handleAsync(jobsHandler.updateJob));
