// @flow

import program from 'commander';
import glob from 'glob';
import { join, basename } from 'path';

import aliasedAction from 'helpers/aliasedAction';

import Generator from 'classes/Generator';

export default class Samba {
  args: string[] = [];
  namedArgs: { [name: string]: string } = {};

  generators: { [name: string]: string } = {};

  load(path: string) {
    this.setup(path);
    glob.sync(`${path}/samba/generators/*/*.generator.js`).forEach(path => {
      const name = basename(path);

      // $FlowFixMe
      this.generators[name] = require(path);

      // console.log(this.generators[name].default.config.generate.args);
    });
  }

  setup(path: string) {}

  generator(name: string): Generator {
    return new Generator();
  }

  registerCommands() {}

  onCommand() {}

  play() {
    this.registerCommands();
    // this.createGenerator(this.generator).play(this.action);
  }
}
