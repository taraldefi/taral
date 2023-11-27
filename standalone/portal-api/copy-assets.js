// copy-assets.js

const fs = require('fs-extra');

fs.copy('./src/modules/mail/templates', './dist/standalone/portal-api/src/modules/mail/templates', function (err) {
  if (err) {
    console.error('Error occurred while copying the folder.', err);
  } else {
    console.log('Mail template directory copied to dist!');
  }
});

fs.copy('./src/i18n', './dist/standalone/portal-api/src/i18n', function (err) {
    if (err) {
      console.error('Error occurred while copying the folder.', err);
    } else {
      console.log('I18n assets directory copied to dist!');
    }
});
  