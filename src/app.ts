/* eslint-disable import/no-extraneous-dependencies */
import express, { Express } from 'express';
import passport from 'passport';
import { config, logger, database } from './config';
// import { router } from './routes';
import 'reflect-metadata';
import { passportStrategy } from './strategy';

database
  .initialize()
  .then(() => {
    logger.info('Connected to the database');
  })
  .catch(error => {
    logger.error(`Failed to connect to the database: ${error}`);
  });

const port = config.SERVER_PORT;

const app: Express = express();
app.use(express.json());
// app.use(router);
app.use(passport.initialize());
passportStrategy(passport);

export { app, port };
