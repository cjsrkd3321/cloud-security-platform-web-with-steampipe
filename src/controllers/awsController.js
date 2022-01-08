import { pg } from '../db';
import * as awsQueries from '../queries/aws';

export const awsHome = async (req, res) => {
  const queries = Object.keys(awsQueries);
  return res.render('cloud-home', { pageTitle: 'Cloud-Home', queries });
};

export const awsTable = async (req, res) => {
  const { table } = req.params;
  const pageTitle = 'Cloud-Table';
  let rows = [];

  const query =
    awsQueries[Object.keys(awsQueries).find((query) => query === table)];
  if (!query) {
    return res.status(400).redirect('/aws');
  }

  try {
    const queryResult = await pg.query(query);
    rows = queryResult.rows;
  } catch (err) {
    return res.status(400).render('cloud-table', {
      pageTitle,
      rows: [],
      errorMessage: `[aws][awsTable] ${err}`,
    });
  }

  return res.render('cloud-table', { pageTitle, rows });
};
