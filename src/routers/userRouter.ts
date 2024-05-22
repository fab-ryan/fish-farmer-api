import { Router } from 'express';
import { userController } from '../controllers';
import {
  userCreationSchema,
  userParamQuerySchema,
  userUpdateSchema,
} from '../schemas';
import {
  validationMiddleware,
  requestType,
  isAdmin,
  isAuthenticated,
  // isOperator,
  isAllowed,
} from '../middlewares';

const UserRouter = Router();

UserRouter.get('/users', isAuthenticated, isAdmin, userController.getUsers);
UserRouter.get(
  '/users/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(userParamQuerySchema, requestType.params),
  userController.getUserById
);
UserRouter.post(
  '/users',
  validationMiddleware(userCreationSchema, requestType.body),
  userController.createUser
);
UserRouter.patch(
  '/users/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(userParamQuerySchema, requestType.params),
  validationMiddleware(userUpdateSchema, requestType.body),
  userController.updateUser
);

UserRouter.delete(
  '/users/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(userParamQuerySchema, requestType.params),
  userController.deleteUser
);

UserRouter.get(
  '/users/role/:role',
  isAuthenticated,
  isAllowed(['admin', 'operator']),
  userController.getUsersByRole
);

export { UserRouter };
