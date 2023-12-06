import { registerAs } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import config from 'config';

type storageType = 'local' | 'S3';

export default registerAs('filesystem', () => {
  const storageType = (process.env.FILE_DRIVER || config.get('file.driver')) as storageType;
  
  if (storageType === 'S3') {
    return {
      default: 'docs',
      disks: {
        files: {
          driver: 's3',
          bucket: process.env.AWS_DEFAULT_S3_BUCKET || config.get('aws.bucket'),
          key: process.env.ACCESS_KEY_ID || config.get('aws.accessKeyId'),
          secret: process.env.SECRET_ACCESS_KEY || config.get('aws.secretAccessKey'),
          region: process.env.AWS_S3_REGION || config.get('aws.region'),
        },
      },
    };
  }

  const localStorageDirectory = process.env.LOCAL_STORAGE_DIR || config.get('file.localDir');
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
