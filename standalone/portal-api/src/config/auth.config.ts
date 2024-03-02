import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';

export default registerAs('auth', () => ({
  secret: Configuration.jwt.secret,
  expires: Configuration.jwt.expiresIn,
}));
