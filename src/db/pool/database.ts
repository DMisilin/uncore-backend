import { Pool } from 'pg';
import config from '../../config';
import queries from './queries';
import logger from "../../logger";

const {
  host,
  port,
  user,
  password,
  database,
  schema,
  max,
  idleTimeoutMillis,
} = config.database();

class Database {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool ({
      host,
      port,
      database,
      user,
      password,
      max,
      idleTimeoutMillis
    });
  }

  public async query(queryName: string, params: object): Promise<any[]> {
    let client = null;

    try {
      const query = this.getQueryByName(queryName);
      const preparedQuery = this.getPrepareQuery(query, params);
      client = await this.pool.connect();
      // TODO вынести в конфиг, на случай, если схем будет больше
      await client.query(`SET search_path TO '${schema}';`);
      const result = await client.query(preparedQuery);

      return result.rows;
    } catch(error: any) {
      logger.error(`Query error: `, error.message);
      throw new Error(`Query error: ${error.message}`);
    } finally {
      client && client.release();
    }
  }

  public async doConnect() {
    await this.pool.connect(function (err) {
      if (err) throw new Error(err.message);
      console.log('Connected');
    });
  }

  private getQueryByName(queryName: string) {
    const query = queries[queryName];

    if (!query) {
      throw new Error(`Query with name ${queryName} not found`);
    }

    return query;
  }

  private getPrepareQuery(query: string, params: any) {
    let prepared = query;

    prepared = prepared.replace(/:(\w+)/g, (text, pl) => {
      if (params[pl]) return params[pl];
      return text;
    });

    for (const [key] of Object.entries(params)) {
      // TODO оптимизировать
      const reg1 = new RegExp(`/\\*${key}`, 'gi');
      const reg2 = new RegExp(`${key}\\*/`, 'gi');
      prepared = prepared.replace(reg1, '');
      prepared = prepared.replace(reg2, '');
    }

    return prepared;
  }
}

export default Database;