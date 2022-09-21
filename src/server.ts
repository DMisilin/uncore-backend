import express from 'express';
import bodyParser from 'body-parser';
import router from './routers/router';
// import pool from './db/pool';
import Database from './db/pool/db';
import loggerMiddleware from './middleware/logger-middleware';

class Server {
  private app;
  private pool: Database | null;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.pool = null;
    // this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended:true }));
    this.app.use(bodyParser.json({ limit: '3mb' }));
    this.app.use(loggerMiddleware);
  }

  // private dbConnect() {
  //   pool.connect(function (err) {
  //     if (err) throw new Error(err.message);
  //     console.log('Connected');
  //   });
  // }

  private routerConfig() {
    this.app.use('/', router);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      }).on('error', (err: Error) => reject(err));
    });
  };
}

export default Server;