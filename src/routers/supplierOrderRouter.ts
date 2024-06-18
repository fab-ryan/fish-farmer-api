import { Router } from 'express';
import { SupplierOrdersController } from '../controllers';
import {
  isAuthenticated,
  isOperator,
  isSupplier,
  validationMiddleware,
  requestType,
} from '../middlewares';
import {
  supplierOrderCreateSchema,
  idQueryParamsSchema,
  supplierOrderStatusSchema,
} from '../schemas';

const router = Router();

router.get(
  '/supplier-orders',
  isAuthenticated,
  isSupplier,
  SupplierOrdersController.getSupplierOrders
);
router.get(
  '/supplier-orders/:id',
  isAuthenticated,
  isSupplier,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  SupplierOrdersController.getSupplierOrderById
);

router.post(
  '/supplier-orders',
  isAuthenticated,
  // isOperator,
  validationMiddleware(supplierOrderCreateSchema, requestType.body),
  SupplierOrdersController.createSupplierOrder
);

router.patch(
  '/supplier-orders/:id',
  isAuthenticated,
  isOperator,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  validationMiddleware(supplierOrderCreateSchema, requestType.body),
  SupplierOrdersController.updateSupplierOrder
);

router.delete(
  '/supplier-orders/:id',
  isAuthenticated,
  isOperator,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  SupplierOrdersController.deleteSupplierOrder
);

router.get(
  '/operator/supplier-orders',
  isAuthenticated,
  isOperator,
  SupplierOrdersController.operatorGetAllSupplierOrders
);
router.patch(
  '/supplier-orders/:id/status',
  isAuthenticated,
  isSupplier,
  validationMiddleware(idQueryParamsSchema, requestType.params),
  validationMiddleware(supplierOrderStatusSchema, requestType.body),
  SupplierOrdersController.updateSupplierOrderStatus
);

export { router as supplierOrderRouter };
