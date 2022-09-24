import { Post, Body, JsonController, HttpError } from 'routing-controllers';
import 'reflect-metadata';
import { CreateRequestDto } from './dto/create-request-dto';
import { v4 as uuid4 } from "uuid";
import pool from '../db/pool/pool';

@JsonController()
export class CreateRequest {
  @Post('/create-request')
  async createRequest (@Body() body: CreateRequestDto) {
    try {
      const result = await pool.query('createRequest', {
        body,
        requestId: uuid4(),
      });

      return {data: result[0]};
    } catch (error: any) {
      throw new HttpError(500, `Error: ${error.message}`);
    }
  }
}