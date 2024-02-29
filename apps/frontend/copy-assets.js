// copy-assets.js

const fs = require('fs-extra');

fs.copy('./.next/static', './.next/standalone/apps/frontend/.next/static', function (err) {
  if (err) {
    console.error('Error occurred while copying the static folder.', err);
  } else {
    console.log('Static directory copied to standalone!');
  }
});

fs.copy('./public', './.next/standalone/apps/frontend/.next/public', function (err) {
    if (err) {
      console.error('Error occurred while copying the public folder.', err);
    } else {
      console.log('Public directory copied to standalone!');
    }
});

// fs.copy('./public', './.next/standalone/apps/frontend/.next/public/images', function (err) {
//     if (err) {
//       console.error('Error occurred while copying the public folder.', err);
//     } else {
//       console.log('Public directory copied to standalone!');
//     }
// });
    