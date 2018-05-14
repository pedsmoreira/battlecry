// @flow

import program from 'commander';
import glob from 'glob';
import { basename } from 'path';
import fs from 'fs';
import chalk from 'chalk';

import pkg from '../../package.json';

import Generator from './Generator';

import log from '../helpers/log';
import dd from '../helpers/dd';

export default class Samba {
  executed: boolean;

  aliases: { [alias: string]: string } = {};
  generators: { [name: string]: Generator } = {};

  load(path: string) {
    this.setup(path);
    glob.sync(`${path}/generators/*/*.generator.js`).forEach(path => {
      try {
        // $FlowFixMe
        const generatorClass = require(path).default;
        const name = basename(path, '.generator.js');

        if (!generatorClass) return log.warn(`Skipping generator ${basename(path)} - missing export default`);
        this.generators[name] = this.createGenerator(name, path, generatorClass);
      } catch (error) {
        dd(error);
      }
    });
  }

  setup(path: string) {
    const setupPath = `${path}/samba-setup.js`;
    const setupExists = fs.existsSync(`${setupPath}`);

    if (setupExists) {
      try {
        // $FlowFixMe
        const fn: Function = require(setupPath).default;

        if (fn) fn(this);
        else log.warn(`Skipping samba-setup.js in folder ${basename(path)} - empty file`);
      } catch (error) {
        dd(error);
      }
    }
  }

  alias(method: string): ?string {
    const values = Object.values(this.aliases);
    const index = values.indexOf(method);

    return index !== -1 ? Object.keys(this.aliases)[index] : null;
  }

  generator(name: string): Generator {
    return this.createGenerator(name, this.generators[name].path, this.generators[name].constructor);
  }

  createGenerator(name: string, path: string, generatorClass: typeof Generator): Generator {
    const generator = new generatorClass();
    generator.name = name;
    generator.samba = this;
    generator.path = path;

    return generator;
  }

  register() {
    Object.keys(this.generators).forEach(name => this.generators[name].register());
  }

  help() {
    Object.keys(this.generators).forEach(name => {
      this.generators[name].help();
      console.log();
    });
  }

  about() {
    log.emptyLine();
    log.default('Contributors:');
    log.emptyLine();

    log.success(`🇧🇷  Pedro S. Moreira`);
    log.addIndentation();
    log.log(chalk.blueBright, '🌎  http://pedrosm.com/');
    log.log(chalk.yellow, '💻  https://github.com/pedsmoreira');

    log.emptyLine();
    process.exit();
  }

  get transmutedArgv(): string[] {
    const [node, bin, method, generator, ...rest] = process.argv;
    if (['--about', '-A'].includes(method)) this.about();
    if (['--help', '-h', '--version', '-V'].includes(method)) return process.argv;

    const aliasedMethod = this.aliases[method] || method;
    return [node, bin, `${aliasedMethod}-${generator}`, ...rest];
  }

  play() {
    this.register();

    program
      // $FlowFixMe
      .version(pkg.version)
      .usage('<method> <generator> [args] [options]')
      .option('-A, --about', 'output info about Samba contributors')
      .on('--help', () => this.help())
      .parse(this.transmutedArgv);

    if (!this.executed) {
      program.outputHelp();

      // $FlowFixMe
      log.warn('Command not found. Check the commands available above');
      log.emptyLine();
    }
  }
}
