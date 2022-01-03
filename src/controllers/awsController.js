import { pg } from '../db';

export const awsHome = async (req, res) => {
  const pageTitle = 'Cloud-Home';
  let rows = [];
  try {
    const testData = await pg.query('SELECT * FROM aws_account');
    rows = testData.rows;
  } catch (err) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: `[aws][awsHome] ${err} / please retry.`,
    });
  }

  return res.render('cloud-home', { pageTitle, rows });
};
