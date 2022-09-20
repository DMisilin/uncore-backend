import { Request, Response } from 'express';
import { Logger } from 'log4js';
import Database from '../db/pool/db';
import crypto from 'crypto';

class CResponse {
  private readonly logger: Logger;
  private readonly db: Database;

  constructor(logger: Logger, db: Database) {
    this.logger = logger;
    this.db = db;
  }

  public CreateResponse = async (request: Request, response: Response) => {
    try {
      const result = await this.db.query('createResponse', {
        ...request.body,
        requestUserId: crypto.randomUUID(),
      });
      response.send({data: result});
    } catch (error: any) {
      response.status(503).send({error: error.message});
    }
  };
}

export default CResponse;