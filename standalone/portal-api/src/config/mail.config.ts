import { registerAs } from '@nestjs/config';
import config from 'config';

export default registerAs('mail', () => ({
  port: parseInt(process.env.MAIL_PORT || config.get('mail.port'), 10),
  host: process.env.MAIL_HOST || config.get('mail.host'),
  user: process.env.MAIL_USER || config.get('mail.user'),
  password: process.env.MAIL_PASSWORD || config.get('mail.password'),
  defaultEmail: process.env.MAIL_DEFAULT_EMAIL || config.get('mail.defaultEmail'),
  defaultName: process.env.MAIL_DEFAULT_NAME || config.get('mail.defaultName'),
  ignoreTLS: (process.env.MAIL_IGNORE_TLS || config.get('mail.ignoreTls')) === 'true',
  secure: (process.env.MAIL_SECURE || config.get('mail.secure')) === 'true',
  requireTLS: (process.env.MAIL_REQUIRE_TLS || config.get('mail.requireTls')) === 'true',
}));
