/* eslint-disable import/no-extraneous-dependencies */
import { Server, Socket, ServerOptions } from 'socket.io';
import { Server as HttpServer } from 'http';

import { logger } from './logger';

/**
 * @description Create a socket server
 * @param {HttpServer} httpServer - The http server
 * @param {ServerOptions} options - The options for the socket server
 * @returns {Server} The socket server
 *
 */
class SocketServer {
  private static instance: Server;

  /**
   * @description Create a socket server
   * @param {HttpServer} httpServer - The http server
   * @param {ServerOptions} options - The options for the socket server
   * @returns {Server} The socket server
   * @static
   * @memberof SocketServer
   */
  public static initialize(
    httpServer: HttpServer,
    options: Partial<ServerOptions> = {}
  ): Server {
    if (!SocketServer.instance) {
      SocketServer.instance = new Server(httpServer, options);

      SocketServer.instance.on('connection', (socket: Socket) => {
        logger.info(`Client connected: ${socket.id}`);
      });

      SocketServer.instance.on('disconnect', (socket: Socket) => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    }

    return SocketServer.instance;
  }

  /**
   * @description Get the socket server instance
   * @returns {Server} The socket server instance
   * @static
   * @memberof SocketServer
   */
  public static getInstance(): Server {
    if (!SocketServer.instance) {
      logger.error('Socket server not initialized');
    }

    return SocketServer.instance;
  }
}

export { SocketServer };
