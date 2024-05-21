import dotenv from 'dotenv';

dotenv.config();

type TConfig = {
  SERVER_PORT: string | number;
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
  SERVER_PORT: process.env.PORT || 3000,
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
