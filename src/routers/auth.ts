import { Router } from 'express';

import 'express-async-errors';
import { handleAsync } from '../middlewares/async-handler';
import { authHandler } from '../handlers/auth-handler';
import { authMiddleware } from '../middlewares/auth';

export const authRouter: Router = Router();

authRouter.post('/api/auth', handleAsync(authHandler.auth));
authRouter.get('/api/auth', authMiddleware, handleAsync(authHandler.userInfo));
