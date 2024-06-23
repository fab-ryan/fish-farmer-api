import { Router } from 'express';
import { userController, updateProfileController } from '../controllers';
import {
  userCreationSchema,
  userParamQuerySchema,
  // userUpdateSchema,
  updateProfileSchema,
} from '../schemas';
import {
  validationMiddleware,
  requestType,
  isAdmin,
  isAuthenticated,
  // isOperator,
  isAllowed,
  uploadProfileMiddleware,
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
  '/users/profile',
  isAuthenticated,
  uploadProfileMiddleware,
  validationMiddleware(updateProfileSchema, requestType.body),
  updateProfileController.createProfile
);

// UserRouter.patch(
//   '/users/:id',
//   isAuthenticated,
//   isAdmin,
//   validationMiddleware(userParamQuerySchema, requestType.params),
//   validationMiddleware(userUpdateSchema, requestType.body),
//   userController.updateUser
// );

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

UserRouter.get(
  '/users/profile',
  isAuthenticated,
  updateProfileController.getProfile
);
export { UserRouter };
