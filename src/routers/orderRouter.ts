import { Router } from 'express';
import { orderController } from '../controllers';
import {
  isAuthenticated,
  isOperator,
  isAdmin,
  validationMiddleware,
  requestType,
  isAllowed,
} from '../middlewares';
import {
  orderCreateSchema,
  idQueryParamsSchema,
  orderQuerySchema,
  orderStatusSchema,
} from '../schemas';

const orderRouter = Router();

orderRouter.post(
  '/orders',
  isAuthenticated,
  validationMiddleware(orderCreateSchema, requestType.body),
  orderController.createOrder
);
orderRouter.get('/orders', isAuthenticated, orderController.getOrders);
orderRouter.get(
  '/orders/:id',
  isAuthenticated,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  orderController.getOrderById
);
orderRouter.patch(
  '/orders/:id',
  isAuthenticated,
  isOperator,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  validationMiddleware(orderQuerySchema, requestType.body),
  orderController.updateOrder
);
orderRouter.delete(
  '/orders/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  orderController.deleteOrder
);
orderRouter.patch(
  '/orders/:id/status',
  isAuthenticated,
  isAllowed(['operator', 'admin']),
  validationMiddleware(idQueryParamsSchema, requestType.params),
  validationMiddleware(orderStatusSchema, requestType.body),
  orderController.updateStatus
);

export { orderRouter };
