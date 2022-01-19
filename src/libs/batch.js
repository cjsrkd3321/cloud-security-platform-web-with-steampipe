import md5 from 'md5';
import { pg } from '../db';
import { DEFAULT_TTL } from '../libs/time';
import Compliance from '../models/Compliance';

class Batch {
  static async batchQuery(title, query) {
    try {
      const queryResults = (await pg.query(query)).rows;

      const results = queryResults.map((result) => {
        const id = md5(JSON.stringify(result));
        return { ...result, id };
      });

      (await Compliance.findOneAndUpdate(
        { title },
        { results, complianceLastUpdatedAt: Date.now() }
      )) ??
        (await Compliance.create({
          title,
          results,
          complianceLastUpdatedAt: Date.now(),
        }));
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(Batch.batchQuery, DEFAULT_TTL, title, query);
    }
  }
}

export default Batch;
