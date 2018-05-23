require('@babel/polyfill');
const dirname = require('path').dirname;
const fs = require('fs');
const babelRc = JSON.parse(fs.readFileSync(`${__dirname}/../.babelrc`, 'utf8'));

function buildPath(name) {
  return `${__dirname}/../node_modules/${name}`;
}

function buildPresets() {
  return babelRc.presets.map(preset => buildPath(preset));
}

function buildPlugin(plugin) {
  const name = plugin[0] === 'module-resolver' ? 'babel-plugin-module-resolver' : plugin[0];
  const options = plugin[1];
  return [buildPath(name), options];
}

function buildPlugins() {
  return babelRc.plugins.map(plugin => (typeof plugin === 'string' ? buildPath(plugin) : buildPlugin(plugin)));
}

require('@babel/register')({
  babelrc: false,
  presets: buildPresets(),
  plugins: buildPlugins()
});
