// @flow

import aliases from 'aliases';

export default function action() {
  const actionArg = process.argv[2];

  const alias = Object.entries(aliases).find(entry => entry[1] === actionArg);
  return alias ? alias[0] : actionArg;
}
