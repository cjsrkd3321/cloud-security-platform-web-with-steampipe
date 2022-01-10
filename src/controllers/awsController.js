import { pg } from '../db';
import Compliance from '../models/Compliance';
import * as awsQueries from '../queries/aws';

export const awsHome = async (req, res) => {
  const queries = Object.keys(awsQueries);
  return res.render('cloud-home', { pageTitle: 'Cloud-Home', queries });
};

export const awsTable = async (req, res) => {
  const { table } = req.params;
  const pageTitle = 'Cloud-Table';
  let complianceResult = {};

  const title = Object.keys(awsQueries).find((query) => query === table);
  if (!title) {
    return res.status(400).redirect('/aws');
  }

  try {
    const compliance = await Compliance.findOne({ title }).lean();
    const { createdAt, results } = compliance;
    complianceResult = { title, results, createdAt };
    if (!compliance) {
      return res.render('cloud-table', {
        pageTitle,
        complianceResult,
      });
    }
  } catch (err) {
    return res.status(400).render('cloud-table', {
      pageTitle,
      complianceResult,
      errorMessage: `[aws][awsTable] ${err}`,
    });
  }

  return res.render('cloud-table', { pageTitle, complianceResult });
};
