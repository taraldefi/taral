import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';

export default registerAs('onchain', () => (Configuration.onchain));
