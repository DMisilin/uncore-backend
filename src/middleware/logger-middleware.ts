import { NextFunction, Request, Response } from "express";
import logger from '../logger';

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  logger.log(`Request '${request.url}', body: ${JSON.stringify(request.body)}`);
  next();
}

export default loggerMiddleware;
