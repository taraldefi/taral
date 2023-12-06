import { registerAs } from '@nestjs/config';
import config from 'config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL || config.get('db.url'),
  type: process.env.DATABASE_TYPE || config.get('db.type'),
  host: process.env.DATABASE_HOST || config.get('db.host'),
  port: parseInt(process.env.DATABASE_PORT || config.get('db.port'), 10) || 5432,
  password: process.env.DATABASE_PASSWORD || config.get('db.password'),
  name: process.env.DATABASE_NAME || config.get('db.name'),
  username: process.env.DATABASE_USERNAME || config.get('db.username'),
  synchronize: (process.env.DATABASE_SYNCHRONIZE || config.get('db.synchronize')) === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || config.get('db.maxConnections'), 10) || 100,
  sslEnabled: (process.env.DATABASE_SSL_ENABLED || config.get('db.sslEnabled')) === 'true',
  rejectUnauthorized: (process.env.DATABASE_REJECT_UNAUTHORIZED || config.get('db.rejectUnauthorized')) === 'true',
  ca: process.env.DATABASE_CA || config.get('db.ca'),
  key: process.env.DATABASE_KEY || config.get('db.key'),
  cert: process.env.DATABASE_CERT || config.get('db.cert'),
}));
