import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string
): Response => {
  const result = !!/^20\d$/.test(statusCode.toString());
  const route = res.req?.route || { path: 'unknown' };
  return res.status(statusCode).json({
    status: result,
    data,
    message,
    timestamp: new Date(Date.now()).toISOString(),
    path: route.path,
  });
};
