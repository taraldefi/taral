import { registerAs } from '@nestjs/config';
import config from 'config';

export default registerAs('onchain', () => ({
  mock: (process.env.ONCHAIN_MOCK || config.get('onchain.mock')) === 'true',
  network: process.env.ONCHAIN_NETWORK || config.get('onchain.network'),
  privateKey: process.env.ONCHAIN_PRIVATEKEY || config.get('onchain.privateKey'),
  publicKey: process.env.ONCHAIN_PUBLICKEY || config.get('onchain.publicKey'),
  address: process.env.ONCHAIN_ADDRESS || config.get('onchain.address'),
}));
