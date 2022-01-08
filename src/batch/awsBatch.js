import Batch from '../libs/batch';
import * as awsQueries from '../queries/aws';

Object.keys(awsQueries).forEach((query) => new Batch(awsQueries[query]));
