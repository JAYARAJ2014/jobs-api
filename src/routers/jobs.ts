import { Router } from 'express';

import 'express-async-errors';
import { handleAsync } from '../middlewares/async-handler';

import { jobsHandler } from '../handlers/jobs-handler';

export const jobsRouter: Router = Router();

jobsRouter.get('/', handleAsync(jobsHandler.getAllJobs));
jobsRouter.post('/', handleAsync(jobsHandler.createJob));
jobsRouter.get('/:id', handleAsync(jobsHandler.getJob));
// jobsRouter.post('/jobs', handleAsync(jobsHandler.deleteJob));
jobsRouter.patch('/:id', handleAsync(jobsHandler.updateJob));
