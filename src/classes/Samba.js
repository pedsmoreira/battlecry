// @flow

import program from 'commander';
import glob from 'glob';
import { join, basename } from 'path';
import fs from 'fs';

import Generator from 'classes/Generator';

export default class Samba {
  aliases: { [alias: string]: string } = {};
  generators: { [name: string]: Generator } = {};

  load(path: string) {
    this.setup(path);
    glob.sync(`${path}/samba/generators/*/*.generator.js`).forEach(path => {
      // $FlowFixMe
      const generatorClass = require(path).default;

      const name = basename(path, '.generator.js');
      this.generators[name] = this.createGenerator(name, generatorClass);
    });
  }

  setup(path: string) {
    const setupPath = `${path}/samba/samba-setup.js`;
    const setupExists = fs.existsSync(`${setupPath}`);

    if (setupExists) {
      // $FlowFixMe
      const fn: Function = require(setupPath).default;
      fn(this);
    }
  }

  alias(method: string): ?string {
    const values = Object.values(this.aliases);
    const index = values.indexOf(method);

    return index !== -1 ? Object.keys(this.aliases)[index] : null;
  }

  generator(name: string): Generator {
    return this.createGenerator(name, this.generators[name].constructor);
  }

  createGenerator(name: string, generatorClass: typeof Generator): Generator {
    const generator = new generatorClass();
    generator.name = name;
    generator.samba = this;

    return generator;
  }

  register() {
    Object.keys(this.generators).forEach(name => this.generators[name].register());
  }

  play() {
    this.register();

    program
      .usage('<method> <generator> [args]')
      .on('--help', () => {
        console.log('Generators:');

        Object.keys(this.generators).forEach(name => {
          console.log();
          this.generators[name].help();
        });
      })
      .parse(process.argv);
  }
}
