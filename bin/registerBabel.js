require('babel-polyfill');
const { dirname, join } = require('path');
const fs = require('fs');
const babelRc = JSON.parse(fs.readFileSync(`${__dirname}/../.babelrc`, 'utf8'));

function ignore(filename) {
  // Fix for paths on Windows
  filename = filename.replace(/\\(\\?)/g, '/');
  if (filename.includes(`battlecry/node_modules/`)) return true;

  const inNodeModules = filename.includes('node_modules/');
  const inBattlecryFolder = filename.includes('battlecry/');
  return inNodeModules && !inBattlecryFolder;
}

function buildPath(type, name) {
  /* 
   When it's running locally, the executable is inside "$ROOT/node_modules/.bin/cry|battlecry".
   Globally it's only "/bin/cry|battlecry"
  */
  const isLocal = process.argv.some(arg => arg.includes('.bin'));

  const localPath = join(__dirname, `../../babel-${type}-${name}`);
  const globalPath = join(__dirname, `/../node_modules/babel-${type}-${name}`);

  return isLocal ? localPath : globalPath;
}

function buildPresets() {
  return babelRc.presets.map(preset => buildPath('preset', preset));
}

function buildModuleResolver() {
  return [
    buildPath('plugin', 'module-resolver'),
    {
      root: [`${process.cwd()}/battlecry`],
      alias: {
        battlecry: `${__dirname}/..`
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
