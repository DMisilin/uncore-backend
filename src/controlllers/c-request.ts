import { Request, Response } from "express";
import pool from '../db/pool';
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

  public async getTest(request: Request, response: Response) {
    try {
      const client = await pool.connect();
      const sql = "SELECT NOW()";
      const { rows } = await client.query(sql);

      client.release();

      return response.status(200).send(rows);
    } catch (error) {
      return response.status(400).send(error);
    }
  }

  public createRequest = async (request: Request, response: Response) => {
    try {
      const result = await this.db.query('createRequest', {
        ...request.body,
        requestId: crypto.randomUUID(),
      });

      return response.send({data: result[0]});
    } catch (error) {
      return response.status(503).json(error);
    }
  };

  public getRequests = async (request: Request, response: Response) => {
    try {
      const result = await this.db.query('getRequests', request.body);
      return response.send({data: result});
    } catch (error) {
      return response.status(503).json(error);
    }
  };

  public modifyRequest = (request: Request, response: Response) => {
    try {
      console.log('lo_ol_line_21 --> : modifyRequest');
      return response.send({data: {}});
    } catch (error) {
      return response.status(503).json(error);
    }
  };
}

export default CRequest;