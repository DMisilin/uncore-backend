import { getLogger, configure } from 'log4js';

configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'app.log', maxLogSize: 2000000, compress: true }
  },
  categories: {
    default: {
      appenders: ['app', 'out'],
      level: 'error'
    }
  }
});

const logger = getLogger();
logger.level = process.env.LOG_LEVEL || 'debug';

export default logger;
