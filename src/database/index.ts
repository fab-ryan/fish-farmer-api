import { Sequelize } from 'sequelize';
import getDatabaseConfig from '../config/db_config';
import Models from './models';
import { logger } from '../utils';

export * from './models';

interface DatabaseConfigInterface {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
  dialect: string;
  secret: string;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const { username, database, password, host, dialectOptions } =
  getDatabaseConfig() as DatabaseConfigInterface;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  logging: true,
  ...(dialectOptions ? { dialectOptions } : {}),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    logger.error('Unable to connect to the database:', err);
  });

const models = Models(sequelize);

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

const Database = { sequelize, ...models };
export default Database;
