import passport from 'passport';
import { NextFunction, Response, Request } from 'express';
import { sendResponse } from '../utils';
import { User } from '../database';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: User | null) => {
      if (err) {
        return sendResponse(res, 401, err, 'Unauthorized');
      }
      if (!user) {
        return sendResponse(res, 401, null, 'Unauthorized');
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user && user.role && user.role.name !== 'admin') {
    return sendResponse(res, 403, null, 'Forbidden');
  }
  next();
};

export const isOperator = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user && user.role && user.role.name !== 'operator') {
    return sendResponse(res, 403, null, 'Forbidden');
  }
  next();
};

export const isSupplier = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user && user.role && user.role.name !== 'supplier') {
    return sendResponse(res, 403, null, 'Forbidden');
  }
  next();
};

export const isAllowed = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user && user.role && !allowedRoles.includes(user.role.name)) {
      return sendResponse(res, 403, null, 'Forbidden');
    }
    next();
  };
};
