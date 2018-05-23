require('@babel/polyfill');
const dirname = require('path').dirname;
const fs = require('fs');
const babelRc = JSON.parse(fs.readFileSync(`${__dirname}/../.babelrc`, 'utf8'));

require('@babel/register')({
  babelrc: false,
  presets: babelRc.presets,
  plugins: babelRc.plugins
});
