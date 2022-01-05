import Batch from '../libs/batch';

new Batch('SELECT * FROM aws.aws_iam_policy WHERE is_aws_managed IS false');
new Batch(
  `SELECT account_id, name, path FROM aws.aws_iam_role WHERE path NOT LIKE '/aws-%'`
);
new Batch('SELECT * FROM aws.aws_account');
