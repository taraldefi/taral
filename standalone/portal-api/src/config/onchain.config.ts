import { registerAs } from '@nestjs/config';

export default registerAs('onchain', () => ({
  mock: process.env.ONCHAIN_MOCK === 'true',
  network: process.env.ONCHAIN_NETWORK,
  privateKey: process.env.ONCHAIN_DEPLOYERPRIVATEKEY,
  publicKey: process.env.ONCHAIN_DEPLOYERPUBLICKEY,
  address: process.env.ONCHAIN_DEPLOYERADDRESS,
}));
