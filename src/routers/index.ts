import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils';
import { RoleRouter } from './roleRouter';
import { UserRouter } from './userRouter';
import { AuthRouter } from './authRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';

const router = Router();
const routers: Router[] = [
  RoleRouter,
  UserRouter,
  AuthRouter,
  productRouter,
  orderRouter,
];

router.use('/api', ...routers);
router.get('/', (req: Request, res: Response) => {
  sendResponse(res, 200, 'Welcome to the API!');
});

router.use((req: Request, res: Response) => {
  sendResponse(res, 404, null, 'Resource not found!');
});

export { router };
