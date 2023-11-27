// import { registerAs } from '@nestjs/config';

// export default registerAs('file', () => ({
//   driver: process.env.FILE_DRIVER,
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
//   awsDefaultS3Url: process.env.AWS_DEFAULT_S3_URL,
//   awsS3Region: process.env.AWS_S3_REGION,
//   maxFileSize: 5242880, // 5mb
// }));

import { registerAs } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

export default registerAs('filesystem', () => {
  const storageMode = process.env.FILE_DRIVER;

  // console.log(`storage : ${storageMode}`);

  if (storageMode === 'S3') {
    return {
      default: 'docs',
      disks: {
        files: {
          driver: 's3',
          bucket: process.env.AWS_DEFAULT_S3_BUCKET,
          key: process.env.ACCESS_KEY_ID,
          secret: process.env.SECRET_ACCESS_KEY,
          region: process.env.AWS_S3_REGION,
        },
      },
    };
  }

  const dir = `./${process.env.LOCAL_STORAGE_DIR}`;
  const absolutePath = path.resolve(dir);

  // console.log(`absolute path: ${absolutePath}`);

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
