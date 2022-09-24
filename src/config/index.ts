import dotenv from 'dotenv';

dotenv.config();

class Config {
  appConfig() {
    return {
      port: parseInt(process.env.PORT || '8000'),
      logLevel: process.env.LOG_LEVEL || 'error',
    };
  }

  database() {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA || 'public',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MILLIS || '30000')
    };
  }
}

export default new Config();
