import { Router } from 'express';
import { authController } from '../controllers';

import { validationMiddleware, isAuthenticated } from '../middlewares';

import { loginSchema } from '../schemas';

const AuthRouter = Router();

AuthRouter.post(
  '/auth/login',
  validationMiddleware(loginSchema),
  authController.login
);
AuthRouter.get('/auth/profile', isAuthenticated, authController.profile);

export { AuthRouter };
