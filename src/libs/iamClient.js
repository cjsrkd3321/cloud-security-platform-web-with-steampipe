import { IAMClient } from '@aws-sdk/client-iam';

const REGION = 'ap-northeast-2';
export const iamClient = new IAMClient({ region: REGION });
