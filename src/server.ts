import { httpServer, port } from './app';
import { logger } from './utils';

httpServer.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
