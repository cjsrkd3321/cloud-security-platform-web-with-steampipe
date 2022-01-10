import { pg } from '../db';
import { DEFAULT_TTL, SECOND } from '../libs/time';
import Compliance from '../models/Compliance';
import { isPluginExists } from '../queries/common';

class Batch {
  constructor(cloud, queries) {
    Batch.#cloud = cloud;
    Batch.#queries = queries;
    Batch.runBatch();
  }

  static #cloud;
  static #queries;

  static async querySteampipe(title, query) {
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
      setTimeout(Batch.querySteampipe, DEFAULT_TTL, title, query);
    }
  }

  static getSchema(cloud) {
    return pg.query(isPluginExists(cloud));
  }

  static async runBatch() {
    const result = await Batch.getSchema(Batch.#cloud);

    // If plugin installed
    if (result.rows[0]) {
      Object.keys(Batch.#queries).forEach((query) =>
        Batch.querySteampipe(query, Batch.#queries[query])
      );
    } else {
      setTimeout(Batch.runBatch, 5 * SECOND);
    }
  }
}

export default Batch;
