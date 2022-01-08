import { pg } from '../db';
import { DEFAULT_TTL } from '../libs/time';

class Batch {
  constructor(query) {
    Batch.#query = query;
    Batch.querySteampipe();
  }

  static #query;

  static async querySteampipe() {
    try {
      await pg.query(Batch.#query);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(Batch.querySteampipe, DEFAULT_TTL);
    }
  }
}

export default Batch;
