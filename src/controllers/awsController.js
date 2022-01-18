import { pg } from '../db';
import Compliance from '../models/Compliance';
import * as awsQueries from '../queries/aws';

export const awsHome = async (req, res) => {
  const queries = Object.keys(awsQueries);
  return res.render('cloud-home', { pageTitle: 'Cloud-Home', queries });
};

export const getAwsTable = async (req, res) => {
  const { table } = req.params;
  const pageTitle = 'Cloud-Table';
  let complianceResult = {};

  const title = Object.keys(awsQueries).find((query) => query === table);
  if (!title) {
    return res.status(400).redirect('/aws');
  }

  try {
    const compliance = await Compliance.findOne({ title }).lean();
    const { createdAt, results, excepted } = compliance;
    const newResults = results.filter(
      (result) => !excepted.includes(result.id)
    );
    complianceResult = { title, newResults, createdAt };
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

export const getAwsException = async (req, res) => {
  const { table: title, id } = req.params;
  const exists = await Compliance.exists({
    $and: [{ title }, { 'results.id': id }],
  });
  if (!exists) {
    return res.status(400).redirect('/');
  }

  const compliance = await Compliance.findOne({ title });
  if (compliance.excepted.includes(id)) {
    return res.status(400).redirect('/');
  }
  compliance.excepted.push(id);
  compliance.save();

  return res.status(200).redirect(`/aws/${title}`);
};
