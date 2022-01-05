import {
  GenerateCredentialReportCommand,
  GetCredentialReportCommand,
} from '@aws-sdk/client-iam';
import { iamClient } from '../libs/iamClient';
import { HOUR, SECOND } from '../libs/time';

const createCredentialReport = async () => {
  let remainedTime = 4 * HOUR;

  try {
    const data = await iamClient.send(new GetCredentialReportCommand());
    remainedTime = Math.floor(
      4 * HOUR - (Date.now() - Date.parse(data.GeneratedTime))
    );
    return;
  } catch (err) {
    while (true) {
      const data = await iamClient.send(new GenerateCredentialReportCommand());
      if (data.State === 'COMPLETE') {
        return;
      }
    }
  } finally {
    setTimeout(createCredentialReport, remainedTime);
  }
};

setTimeout(createCredentialReport, SECOND);
