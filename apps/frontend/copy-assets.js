// copy-assets.js

const fs = require('fs-extra');

fs.copy('./.next/static', './.next/standalone/apps/frontend/static', function (err) {
  if (err) {
    console.error('Error occurred while copying the static folder.', err);
  } else {
    console.log('Static directory copied to standalone!');
  }
});
  