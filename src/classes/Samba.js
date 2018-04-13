// @flow

import program from 'commander';
import chalk from 'chalk';
import glob from 'glob';

import help from 'helpers/help';
import action from 'helpers/action';

export default class Samba {
  action: string;
  generator: string;

  generators: { [name: string]: string };
  parsers: { [name: string]: string };

  constructor() {
    this.action = action();
    this.generator = process.argv[3];
  }

  load(path: string) {
    this.loadGenerators(`${path}/generators`);
    this.loadParsers(`${path}/parsers`);
  }

  loadGenerators(dir: string) {
    glob
      .sync(`${dir}/**/*.generator.js`, { ignore: '**/templates/**' })
      .forEach(({ name, path }) => (this.generators[name] = path));
  }

  loadParsers(dir: string) {
    glob
      .sync(`${dir}/**/*.parser.js`, { ignore: '**/templates/**' })
      .forEach(({ name, path }) => (this.parsers[name] = path));
  }

  hasHelpOption(): boolean {
    return process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1;
  }

  createGenerator() {}

  callGeneratorMethod() {
    // $FlowFixMe
    const generatorClass = require(`${this.path}/samba/generators/${this.generator}/${this.generator}.generator.js`);
    const generator = new generatorClass();

    const method = generator[this.action];
    if (!method) {
      console.log(chalk.red(`Method ${this.action} not found in generator ${this.generator}`));
      process.exit(1);
    }

    method();
  }

  play() {
    if (!this.generator) help();

    if (this.action === 'new') this.createGenerator();
    else this.callGeneratorMethod();
  }
}
