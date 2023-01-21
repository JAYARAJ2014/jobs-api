import { Router } from 'express';

import 'express-async-errors';
import { handleAsync } from '../middlewares/async-handler';
import { authHandler } from '../handlers/auth-handler';
import { authMiddleware } from '../middlewares/auth';

export const authRouter: Router = Router();

authRouter.post('/login', handleAsync(authHandler.login));
authRouter.post('/register', handleAsync(authHandler.register));
