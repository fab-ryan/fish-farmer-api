import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils';
import { RoleRouter } from './roleRouter';

const router = Router();
const routers: Router[] = [RoleRouter];

router.use('/api', ...routers);
router.get('/', (req: Request, res: Response) => {
  sendResponse(res, 200, 'Welcome to the API!');
});

router.use((req: Request, res: Response) => {
  sendResponse(res, 404, 'Resource not found!');
});

export { router };
