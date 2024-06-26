/* eslint-disable import/no-extraneous-dependencies */
import express, { Express } from 'express';
import passport from 'passport';
import cors from 'cors';
import { createServer } from 'http';

import { config } from './config';
import { router } from './routers';
import { passportStrategy } from './strategy';
import { SocketServer } from './utils';

const port = config.SERVER_PORT;

const app: Express = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);
app.use(express.json());
app.use(router);
app.use(passport.initialize());

passportStrategy(passport);
const httpServer = createServer(app);

SocketServer.initialize(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

export { httpServer, port };
