import 'regenerator-runtime';
import 'dotenv/config';
import './db';
import './models/User';
import app from './server';

import './batch/awsCreateCredentialReport';

const PORT = 2000;

app.listen(PORT, () =>
  console.log(`🚀 Server listening on port http://localhost:${PORT}`)
);
