import { registerAs } from '@nestjs/config';
import config from 'config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET || config.get('jwt.secret'),
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || config.get('jwt.expiresIn'),
}));
