import {
  ListCommandInvocationsCommand,
  SendCommandCommand,
} from '@aws-sdk/client-ssm';
import { ssmClient } from '../ssmClient';
import { SECOND, sleep } from '../time';

let commandId = '';

export const createUserWithOTP = async (user, instanceId) => {
  const result = await ssmClient.send(
    new SendCommandCommand({
      DocumentName: 'AWS-RunShellScript',
      DocumentVersion: '1',
      Targets: [
        {
          Key: 'InstanceIds',
          Values: [`${instanceId}`],
        },
      ],
      Parameters: {
        commands: [
          `useradd -m ${user}`,
          '',
          'rm -rf /etc/sudoers.d/ssm-agent-users',
          '',
          'cat << EOF > /etc/sudoers.d/ssm-agent-users',
          '# User rules for ssm-user',
          `ssm-user ALL=(ALL) NOPASSWD:/bin/su - ${user}`,
          'EOF',
          '',
          'chmod 440 /etc/sudoers.d/ssm-agent-users',
          '',
          `cat << EOF > /etc/sudoers.d/${user}-users`,
          '# User rules for ${user}',
          `${user} ALL=(ALL) NOPASSWD:ALL`,
          'EOF',
          '',
          `chmod 440 /etc/sudoers.d/${user}-users`,
          '',
          `cat << EOF > /home/${user}/.google_authenticator`,
          'FNGXJX3AA3JTQ7LN5ZR2OWORSA',
          '" RATE_LIMIT 3 30 1642866955',
          '" DISALLOW_REUSE 54762231',
          '" TOTP_AUTH',
          '80778722',
          '95492158',
          '51907785',
          '82659561',
          '34458805',
          'EOF',
          '',
          `chown ${user}:${user} /home/${user}/.google_authenticator`,
          '',
          `chmod 400 /home/${user}/.google_authenticator`,
        ],
        workingDirectory: [''],
        executionTimeout: ['3600'],
      },
    })
  );

  commandId = result.Command.CommandId;

  while (true) {
    if (isCommandDone(commandId)) {
      return true;
    } else {
      sleep(SECOND);
    }
  }
};

const isCommandDone = async (commandId) => {
  const result = await ssmClient.send(
    new ListCommandInvocationsCommand({
      CommandId: commandId,
    })
  );
  if (result.CommandInvocations[0]?.Status === 'Success') {
    return true;
  } else {
    return false;
  }
};
