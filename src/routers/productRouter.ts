/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, Request, Response } from 'express';
import { productCreateSchema, productSlugSchema } from '../schemas';
import { productController } from '../controllers';
import {
  requestType,
  validationMiddleware,
  uploadProductMiddleware,
  isAuthenticated,
  isOperator,
} from '../middlewares';

const productRouter = Router();

productRouter.post(
  '/products',
  isAuthenticated,
  isOperator,
  uploadProductMiddleware,
  validationMiddleware(productCreateSchema, requestType.body),
  productController.createProduct
);
productRouter.get('/products', productController.getProducts);

productRouter.get(
  '/products/:slug',
  validationMiddleware(productSlugSchema, requestType.params),
  productController.getProductBySlug
);

export { productRouter };
