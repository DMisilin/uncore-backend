import log4js from 'log4js';
import server from './server';
import Config from './config/index';

const logger = log4js.getLogger();
const config = new Config();
const port = config.appConfig().port;
logger.level = config.appConfig().logLevel;

const starter = new server(logger, config).start(port)
  .then(port => logger.info(`Running on port ${port}`))
  .catch(error => logger.error(error));

export default starter;
