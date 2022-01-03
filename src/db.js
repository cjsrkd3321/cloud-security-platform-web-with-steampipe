import mongoose from 'mongoose';
import { Client } from 'pg';

// MongoDB
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error', (err) => console.error('[MongoDB] DB Error', err));
db.once('open', () => console.log('[MongoDB] 🚀 Connected to DB'));

// PostgreSQL
export const pg = new Client({
  user: 'steampipe',
  host: process.env.SP_HOST,
  database: 'steampipe',
  password: process.env.SP_PASSWORD,
  port: 9193,
});

pg.connect((err) => {
  if (err) {
    console.error('[PostgreSQL] DB Error', err);
  } else {
    console.log('[PostgreSQL] 🚀 Connected to DB');
  }
});
