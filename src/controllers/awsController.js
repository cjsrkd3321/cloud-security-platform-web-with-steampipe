import { pg } from '../db';

export const awsHome = async (req, res) => {
  const testData = await pg.query('SELECT * FROM aws_account');
  const rows = testData.rows;

  res.render('cloud-home', { pageTitle: 'Cloud-Home', rows });
};
