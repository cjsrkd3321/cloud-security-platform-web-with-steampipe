import {
  GenerateCredentialReportCommand,
  GetCredentialReportCommand,
} from '@aws-sdk/client-iam';
import Batch from '../libs/batch';
import { iamClient } from '../libs/iamClient';
import { HOUR, SECOND } from '../libs/time';
import * as awsQueries from '../queries/aws';

let INIT_FLAG = false;

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
    if (!INIT_FLAG) {
      INIT_FLAG = true;
      Object.entries(awsQueries).forEach(([title, query]) =>
        Batch.batchQuery(title, query)
      );
    }
    setTimeout(createCredentialReport, remainedTime);
  }
};

setTimeout(createCredentialReport, SECOND);
