import { SSMClient } from '@aws-sdk/client-ssm';

const REGION = 'ap-northeast-2';
export const ssmClient = new SSMClient({ region: REGION });
