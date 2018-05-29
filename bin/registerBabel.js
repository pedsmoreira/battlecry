require('babel-polyfill');
const dirname = require('path').dirname;
const fs = require('fs');
const babelRc = JSON.parse(fs.readFileSync(`${__dirname}/../.babelrc`, 'utf8'));

function ignore(filename) {
  // Fix for paths on Windows
  filename = filename.replace(/\\(\\?)/g, '/');
  if (filename.includes(`samba/node_modules/`)) return true;

  const inNodeModules = filename.includes('node_modules/');
  const inSambaFolder = filename.includes('samba/');
  return inNodeModules && !inSambaFolder;
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
