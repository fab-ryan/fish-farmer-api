import jwt from 'jsonwebtoken';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { config } from '../config';
import { cloudinary } from './cloudinary';
import { logger } from './logger';

export const generateToken = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, config.SECRET as string, {
    expiresIn: '1d',
  });
};

export const fileUpload = async (
  file: Express.Multer.File | undefined,
  folder = 'mobile'
) => {
  logger.info('Uploading to cloudinary', { label: 'fileUpload' });
  try {
    const buffer = file?.buffer || Buffer.from('');
    const tempFilePath = path.join(os.tmpdir(), file?.originalname || '');

    fs.writeFile(tempFilePath, buffer, err => {
      if (err) {
        logger.error('Error writing file to temp folder', {
          label: 'fileUpload',
        });
        throw new Error('Error writing file to temp folder');
      }
    });

    const response = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder,
    });
    fs.unlink(tempFilePath, err => {
      if (err) {
        logger.error('Error deleting file from temp folder', {
          label: 'fileUpload',
        });
        throw new Error('Error deleting file from temp folder');
      }
    });
    return response.secure_url;
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    logger.error(errorMessage, { label: 'fileUpload' });
    throw new Error(`Error uploading to cloudinary', ${errorMessage}`);
  }
};
