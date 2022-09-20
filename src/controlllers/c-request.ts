import { Request, Response } from "express";
import { Logger } from "log4js";
import Database from "../db/pool/db";
import crypto from 'crypto';

class CRequest {
  private readonly logger: Logger;
  private readonly db: Database;

  constructor(logger: Logger, db: Database) {
    this.logger = logger;
    this.db = db;
  }

  public createRequest = async (request: Request, response: Response) => {
    try {
      const result = await this.db.query('createRequest', {
        ...request.body,
        requestId: crypto.randomUUID(),
      });

      return response.send({data: result[0]});
    } catch (error: any) {
      response.status(503).send({error: error.message});
    }
  };

  public getRequests = async (request: Request, response: Response) => {
    try {
      const result = await this.db.query('getRequests', request.body);
      return response.send({data: result});
    } catch (error: any) {
      response.status(503).send({error: error.message});
    }
  };

  public modifyRequest = async (request: Request, response: Response) => {
    try {
      await this.db.query('modifyRequest', request.body);
      return response.send({data: {}});
    } catch (error: any) {
      response.status(503).send({error: error.message});
    }
  };
}

export default CRequest;