require('@babel/polyfill');
const dirname = require('path').dirname;
const normalize = require('path').normalize;
const fs = require('fs');
const babelRc = JSON.parse(fs.readFileSync(`${__dirname}/../.babelrc`, 'utf8'));

function buildPath(name) {
  return normalize(`${__dirname}/../../${name}`);
}

function buildOptions(plugin) {
  const name = plugin[0];
  const options = plugin[1];
  if (name === 'module-resolver') {
    return buildModuleResolver(plugin);
  }
  return [buildPath(name), options];
}

function buildModuleResolver(plugin) {
  return [
    buildPath('babel-plugin-module-resolver'),
    {
      alias: {
        samba: normalize(`${__dirname}/../src`)
      }
    }
  ];
}

function buildPresets() {
  return babelRc.presets.map(preset => (typeof preset === 'string' ? buildPath(preset) : buildOptions(preset)));
}

function buildPlugins() {
  return babelRc.plugins.map(plugin => (typeof plugin === 'string' ? buildPath(plugin) : buildOptions(plugin)));
}

require('@babel/register')({
  babelrc: false,
  ignore: ['**/samba/node_modules/**'],
  presets: buildPresets(),
  plugins: buildPlugins()
});
