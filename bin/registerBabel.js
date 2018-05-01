require('babel-polyfill');
const dirname = require('path').dirname;
const fs = require('fs');
const babelRc = JSON.parse(fs.readFileSync(`${__dirname}/../.babelrc`, 'utf8'));

function ignore(filename) {
  const sambaFolder = dirname(__dirname);
  const inSambaFolder = filename.startsWith(sambaFolder);
  const inNodeModules = filename.includes('node_modules/');

  if (!inNodeModules || !inSambaFolder) return false;

  return !filename.startsWith(`${sambaFolder}/src`) && !filename.startsWith(`${sambaFolder}/samba`);
}

function buildPath(type, name) {
  return `${__dirname}/../node_modules/babel-${type}-${name}`;
}

function buildPresets() {
  return babelRc.presets.map(preset => buildPath('preset', preset));
}

function buildModuleResolver() {
  return [
    buildPath('plugin', 'module-resolver'),
    {
      root: [`${process.cwd()}/samba`],
      alias: {
        samba: `${__dirname}/..`
      }
    }
  ];
}

function buildPlugins() {
  return babelRc.plugins.map(
    plugin => (typeof plugin === 'string' ? buildPath('plugin', plugin) : buildModuleResolver())
  );
}

require('babel-register')({
  babelrc: false,
  ignore: ignore,
  presets: buildPresets(),
  plugins: buildPlugins()
});
