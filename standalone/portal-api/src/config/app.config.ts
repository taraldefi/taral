import { registerAs } from '@nestjs/config';
import config from 'config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || config.get('app.nodeEnv'),
  name: process.env.APP_NAME || config.get('app.name'),
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: process.env.FRONTEND_DOMAIN || config.get('app.frontendDomain'),
  backendDomain: process.env.BACKEND_DOMAIN || config.get('app.backendDomain'),
  port: parseInt(process.env.APP_PORT || process.env.PORT || config.get('app.port'), 10) || 3000,
  apiPrefix: process.env.API_PREFIX || config.get('app.apiPrefix') || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || config.get('app.fallbackLanguage') || 'en',
  appUrl: process.env.BACKEND_DOMAIN || config.get('app.backendDomain'),
  audience: process.env.FRONTEND_DOMAIN || config.get('app.frontendDomain'),
}));
