import { pg } from '../db';
import { createUserWithOTP } from '../libs/ssm/sendCommand';
import Compliance from '../models/Compliance';
import * as awsQueries from '../queries/aws';

export const awsHome = async (req, res) => {
  const queries = Object.keys(awsQueries);
  return res.render('cloud-home', { pageTitle: 'Cloud-Home', queries });
};

export const getAwsTable = async (req, res) => {
  const { table } = req.params;
  const pageTitle = 'Cloud-Table';
  let complianceResults = {};

  const title = Object.keys(awsQueries).find((query) => query === table);
  if (!title) {
    return res.status(400).redirect('/aws');
  }

  try {
    const compliance = await Compliance.findOne({ title }).lean();
    const { complianceLastUpdatedAt, results, exceptions } = compliance;
    const newResults = results.filter(
      (result) => !exceptions.includes(result.id)
    );
    complianceResults = { title, newResults, complianceLastUpdatedAt };
    if (!compliance) {
      return res.render('cloud-table', {
        pageTitle,
        complianceResults,
      });
    }
  } catch (err) {
    return res.status(400).render('cloud-table', {
      pageTitle,
      complianceResults,
      errorMessage: `[aws][awsTable] ${err}`,
    });
  }

  return res.render('cloud-table', { pageTitle, complianceResults });
};

export const setAwsException = async (req, res) => {
  const { table: title, id } = req.params;
  const exists = await Compliance.exists({
    $and: [{ title }, { 'results.id': id }],
  });
  if (!exists) {
    return res.status(400).redirect('/');
  }

  const compliance = await Compliance.findOne({ title });
  if (compliance.exceptions.includes(id)) {
    return res.status(400).redirect('/');
  }
  // compliance.test.push({
  //   id,
  //   owner: req.session.user._id,
  //   expiredAt: Date.now(),
  // });

  compliance.exceptions.push(id);
  compliance.exceptionLastUpdatedAt = Date.now();
  compliance.save();

  return res.status(200).redirect(`/aws/${title}`);
};

export const getAwsException = async (req, res) => {
  const { table: title } = req.params;
  const pageTitle = 'Cloud-Table';
  let exceptedResults = {};

  try {
    const { results, exceptions, exceptionLastUpdatedAt } =
      await Compliance.findOne({ title }).lean();
    const newResults = results.filter((result) =>
      exceptions.includes(result.id)
    );
    exceptedResults = { title, newResults, exceptionLastUpdatedAt };
    if (!results) {
      return res.render('cloud-table', {
        pageTitle,
        exceptedResults,
      });
    }
  } catch (err) {
    return res.status(400).render('cloud-table', {
      pageTitle,
      exceptedResults,
      errorMessage: `[aws][awsTable] ${err}`,
    });
  }

  return res.render('cloud-table', {
    pageTitle,
    exceptedResults,
  });
};

// TODO: Need Update
export const getSecureShell = async (req, res) => {
  const ec2Query = `
    SELECT 
      account_id, 
      instance_id,
      vpc_id,
      private_ip_address,
      instance_state,
      instance_status -> 'InstanceStatus' ->> 'Status' as status
    FROM 
      aws_ec2_instance
    WHERE
      instance_status IS NOT NULL;
  `;
  const data = (await pg.query(ec2Query)).rows;
  return res.render('ssh', { data });
};

// TODO: Need Update
export const getRequestSecureShell = (req, res) => {
  const username = req.session.user.username;
  const instanceId = req.params.instanceId;

  createUserWithOTP(username, instanceId);
  return res.redirect('/aws/ssh');
};
