// @flow

import program from 'commander';
import chalk from 'chalk';

import Generator from './Generator';
import OptionBuilder, { type OptionProperties } from './OptionBuilder';
import ArgBuilder from './ArgBuilder';

import log from '../log';

export type MethodConfig = { options?: OptionProperties, args?: string };

export default class GeneratorMethod {
  generator: Generator;
  name: string;

  constructor(generator: Generator, name: string) {
    this.generator = generator;
    this.name = name;
  }

  get alias(): ?string {
    return this.generator.samba.alias(this.name);
  }

  get config(): MethodConfig {
    return this.generator.config[this.name];
  }

  get args(): string {
    const args = this.config.args;
    if (!args) return '';

    return args
      .split(' ')
      .map(arg => new ArgBuilder(arg).build())
      .join(' ');
  }

  get options(): OptionBuilder[] {
    const options = this.config.options || {};
    return Object.keys(options).map(name => new OptionBuilder(name, options[name]));
  }

  get command(): string {
    return `${this.name}-${this.generator.name} ${this.args}`;
  }

  get action(): Function {
    const method = this;

    return function() {
      method.generator.samba.executed = true;

      log.emptyLine();
      log.success(`🥁  Starting ${method.name} ${method.generator.name}`);
      log.emptyLine();
      log.addIndentation();

      method.generator
        .setArgsArray(method.name, this.parent.args)
        .setOptions(this.opts())
        .play(method.name);

      log.emptyLine();
      log.success('👍  All good!');
      log.removeIndentation();
    };
  }

  register(): void {
    const cmd = program
      // $FlowFixMe
      .command(this.command, '', { noHelp: true })
      .action(this.action);

    this.options.forEach(option => cmd.option(option.build(), option.description));
  }

  help(): void {
    this.helpTitle();
    this.options.forEach(option => option.help());
  }

  helpTitle() {
    let text = chalk.green(this.name);

    const alias = this.alias;
    if (alias) text += chalk.green(`|${alias}`);

    text += ` ${chalk.yellow(this.generator.name)} ${this.config.args || ''}`;
    console.log(text);
  }
}
