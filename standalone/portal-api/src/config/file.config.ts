import { registerAs } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import config from 'config';
import { Configuration } from '../configuration';

type storageType = 'local' | 'S3';

export default registerAs('filesystem', () => {
  const storageType = Configuration.file.driver as storageType;
  
  if (storageType === 'S3') {
    return {
      default: 'docs',
      disks: {
        files: {
          driver: 's3',
          bucket: Configuration.aws.bucket,
          key: Configuration.aws.accessKeyId,
          secret: Configuration.aws.secretAccessKey,
          region: Configuration.aws.region,
        },
      },
    };
  }

  const localStorageDirectory = Configuration.file.localDir;
  const absolutePath = path.resolve(`./${localStorageDirectory}`);

  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath);
  }

  return {
    default: 'docs',
    disks: {
      files: {
        driver: 'local',
        basePath: absolutePath, // fully qualified path of the folder
        baseUrl: process.env.BACKEND_DOMAIN,
      },
    },
  };
});
