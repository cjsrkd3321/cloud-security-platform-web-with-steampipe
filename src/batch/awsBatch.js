import Batch from '../libs/batch';
import { awsAccount, awsIamPolicy, awsIamRole } from '../queries/aws';

// Account
new Batch(awsAccount);

// IAM
new Batch(awsIamPolicy);
new Batch(awsIamRole);
