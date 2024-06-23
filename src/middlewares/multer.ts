/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { sendResponse } from '../utils';

export const filterFile = (
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const multerUploads = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb: FileFilterCallback) => {
    filterFile(file, cb);
  },
});

export const uploadProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  multerUploads.array('images', 5)(req as Request, res as Response, err => {
    if (err instanceof multer.MulterError) {
      return sendResponse(res, 400, null, err.message);
    }

    if (err) {
      return sendResponse(res, 500, null, err.message);
    }
    next();
  });
};

export const uploadProfileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  multerUploads.single('avatar')(req as Request, res as Response, err => {
    if (err instanceof multer.MulterError) {
      return sendResponse(res, 400, null, err.message);
    }

    if (err) {
      return sendResponse(res, 500, null, err.message);
    }
    next();
  });
};
