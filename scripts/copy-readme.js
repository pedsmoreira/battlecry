const { copyFile } = require('fs');
const { resolve } = require('path');

const ROOT = resolve('.');
const README_PATH_ORIGIN = resolve(ROOT, './README.md');
const README_PATH_DEST = resolve(ROOT, 'docs/README.md');

copyFile(README_PATH_ORIGIN, README_PATH_DEST, err => {
  if (err) {
    throw new Error(err);
  }
  console.log('Readme file copied successfully!');
});
