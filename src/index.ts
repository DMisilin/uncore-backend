import server from './server';
import Config from './config/index';
import logger from './logger';

const config = new Config();
const port = config.appConfig().port;

const starter = new server().start(port)
  .then(port => logger.info(`Running on port ${port}`))
  .catch(error => logger.error(error));

export default starter;
