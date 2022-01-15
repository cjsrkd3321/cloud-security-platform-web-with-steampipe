import { pg } from '../db';
import { DEFAULT_TTL } from '../libs/time';
import Compliance from '../models/Compliance';

class Batch {
  static async batchQuery(title, query) {
    try {
      const results = (await pg.query(query)).rows;

      (await Compliance.findOneAndUpdate(
        { title },
        { results, createdAt: Date.now() }
      )) ??
        (await Compliance.create({
          title,
          results,
          createdAt: Date.now(),
        }));
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(Batch.batchQuery, DEFAULT_TTL, title, query);
    }
  }
}

export default Batch;
