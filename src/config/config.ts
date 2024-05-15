import dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

dotenv.config();

type TConfig = {
  SERVER_PORT: string | number;
  DATABASE: {
    TYPE: DatabaseType;
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
  };
  SECRET: string;
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
  MAIL: {
    MAIL_FROM_NAME: string;
    MAIL_FROM_EMAIL: string;
    MAIL_PASSWORD: string;
    MAIL_USERNAME: string;
  };
};

const config: TConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DATABASE: {
    TYPE: 'postgres' as DatabaseType,
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    USERNAME: process.env.DATABASE_USERNAME || 'root',
    PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE: process.env.DATABASE_NAME || '',
  },
  SECRET: process.env.SECRET || 'secret',
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUD_NAME || '',
    API_KEY: process.env.API_KEY || '',
    API_SECRET: process.env.API_SECRET || '',
  },
  MAIL: {
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || '',
    MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL || '',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
    MAIL_USERNAME: process.env.MAIL_USERNAME || '',
  },
};

export { config };
