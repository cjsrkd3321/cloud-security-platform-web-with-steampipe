import { pg } from '../db';
import { DEFAULT_TTL } from '../libs/time';

export const awsAccount = async (req, res) => {
  try {
    await pg.query('SELECT * FROM aws.aws_account');
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(awsAccount, DEFAULT_TTL);
  }
};

setTimeout(awsAccount, 0);
