import { Router } from 'express';
import { roleController } from '../controllers';
import { roleSchema, getRoleSchema } from '../schemas';
import {
  validationMiddleware,
  requestType,
  isAdmin,
  isAuthenticated,
  isAllowed,
} from '../middlewares';

const RoleRouter = Router();

RoleRouter.get(
  '/roles',
  isAuthenticated,
  isAllowed(['admin', 'operator']),
  roleController.getRoles
);
RoleRouter.get(
  '/roles/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(
    getRoleSchema,

    requestType.params
  ),
  roleController.getRoleById
);
RoleRouter.post(
  '/roles',
  isAuthenticated,
  isAdmin,
  validationMiddleware(roleSchema, requestType.body),
  roleController.createRole
);
RoleRouter.patch(
  '/roles/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(getRoleSchema, requestType.params),
  validationMiddleware(roleSchema, requestType.body),
  roleController.updateRole
);
RoleRouter.delete(
  '/roles/:id',
  isAuthenticated,
  isAdmin,

  validationMiddleware(getRoleSchema, requestType.params),
  roleController.deleteRole
);

export { RoleRouter };
