const aliases = require('./aliases');

function action() {
  const actionArg = process.argv[2];

  const aliasIndex = Object.values(aliases).indexOf(actionArg);
  return aliasIndex === -1 ? actionArg : Object.keys(aliases)[aliasIndex];
}

module.exports = action;
