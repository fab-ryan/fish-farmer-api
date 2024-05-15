import { DataSource } from 'typeorm';
import { config } from './config';

export const database: DataSource = new DataSource({
  type: 'postgres',
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/entities/**/*.ts'],
});
