import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';

export default registerAs('mail', () => (Configuration.mail));
