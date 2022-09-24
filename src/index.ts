import config from './config/index';
import logger from './logger';
const port = config.appConfig().port;

import { createExpressServer } from 'routing-controllers';
import { CreateRequest } from './controller/create-request';

const app = createExpressServer({
  controllers: [CreateRequest],
});

app.listen(port, () => logger.info(`Running on port ${port}`));
