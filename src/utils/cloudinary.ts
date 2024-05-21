/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import cloudinary from 'cloudinary';
import { config } from '../config';

const {
  CLOUD_NAME: cloudinary_api_name,
  API_KEY: cloudinary_api_key,
  API_SECRET: cloudinary_api_secret,
} = config.CLOUDINARY;

cloudinary.v2.config({
  cloud_name: cloudinary_api_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
  secure: true,
});

export { cloudinary };
