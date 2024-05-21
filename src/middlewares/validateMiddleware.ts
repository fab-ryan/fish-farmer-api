/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils';

export enum requestType {
  body = 'body',
  params = 'params',
  queries = 'queries',
}

interface errorInterface {
  field: string;
  message: string;
}

export const validationMiddleware =
  (schema: Joi.ObjectSchema, type: requestType = requestType.body) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = schema.validate((req as any)[type], {
        abortEarly: false,
      });
      if (error) {
        const errors: errorInterface[] = [];
        error.details.forEach(err => {
          const field = err.path[0] as string;
          errors.push({
            field,
            message: err.message,
          });
        });

        return sendResponse<errorInterface[]>(
          res,
          400,
          errors,
          'Validation Errors!'
        );
      }
      next();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      return sendResponse(res, 500, null, errorMessage);
    }
  };
