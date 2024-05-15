import { app, port } from './app';
import { logger } from './config';

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
