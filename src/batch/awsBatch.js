import Batch from '../libs/batch';
import * as awsQueries from '../queries/aws';

Object.entries(awsQueries).forEach(([title, query]) =>
  Batch.batchQuery(title, query)
);
