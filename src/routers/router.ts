import { NextFunction, Router, Request, Response } from 'express';
import log4js from 'log4js';
import Config from '../config';
import Ajv from "ajv";
import CRequest from '../controlllers/c-request';
import CResponse from '../controlllers/c-response';
import createResponse from '../model/schemas/create-request-schema';
import getRequests from "../model/schemas/get-requests-schema";
import modifyRequest from "../model/schemas/modify-request-schema";
import Database from '../db/pool/db';

const config = new Config();
const logger = log4js.getLogger();
logger.level = config.appConfig().logLevel;
const router = Router();
const ajv = new Ajv();
const db = new Database(logger, config.database());

const CRequestController = new CRequest(logger, db);
const CResponseController = new CResponse(logger, db);

function validateBody(schema: object) {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) return res.status(400).json(validate.errors);
    return next();
  };
}

router.post('/create-request', validateBody(createResponse), CRequestController.createRequest);
router.post('/get-requests', validateBody(getRequests), CRequestController.getRequests);
router.post('/modify-request', validateBody(modifyRequest), CRequestController.modifyRequest);

router.post('/create-response', validateBody(modifyRequest), CResponseController.CreateResponse);

export default router;