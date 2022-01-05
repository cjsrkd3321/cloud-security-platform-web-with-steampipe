import { pg } from '../db';
import { DEFAULT_TTL } from '../libs/time';

export const batch = async (query) => {
  try {
    await pg.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(batch, DEFAULT_TTL);
  }
};

class Batch {
  constructor(query) {
    Batch.#query = query;
    Batch.querySteampipe();
  }

  static #query;

  static async querySteampipe() {
    try {
      const data = await pg.query(Batch.#query);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(Batch.querySteampipe, DEFAULT_TTL);
    }
  }
}

export default Batch;
