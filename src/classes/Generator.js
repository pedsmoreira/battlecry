// @flow

import fs from 'fs';
import glob from 'glob';
import { join, basename } from 'path';
import chalk from 'chalk';
import program from 'commander';

import File from 'classes/File';
import Samba from 'classes/Samba';

type Args = { [name: string]: string | string[] };
type Options = { [name: string]: string };

type ConfigArgs = string;
type ConfigOptions = { [name: string]: { description: string, arg?: 'required' | 'optional', shortcut?: string } };
type MethodConfig = { options?: ConfigOptions, args?: ConfigArgs };

export default class Generator {
  options: Options;
  args: Args;

  /*
   * Register
   */

  name: string;
  samba: Samba;
  config: { [method: string]: MethodConfig };

  get methods(): string[] {
    return Object.keys(this.config);
  }

  getMethodArgs(method: string): string {
    const config = this.config[method];
    const args = config.args ? config.args.split(' ') : [];

    return args
      .map(arg => {
        const argName = arg.replace(/[.?]/g, '');
        const optional = arg.startsWith('?') || arg.endsWith('?');
        const variadic = arg.startsWith('...') || arg.endsWith('...');

        let argsString = argName;
        if (variadic) argsString += '...';
        argsString = optional ? `[${argsString}]` : `<${argsString}>`;

        return argsString;
      })
      .join(' ');
  }

  register(): void {
    if (!this.methods.length) console.warn(`Generator ${this.name} has no methods in its config property.`);
    this.methods.forEach(method => this.registerMethod(method));
  }

  registerMethod(method: string): void {
    const cmd = program
      // $FlowFixMe
      .command(`${method}-${this.name} ${this.getMethodArgs(method)}`, '', { noHelp: true })
      // $FlowFixMe
      .action(this[method].bind(this));

    const methodConfig = this.config[method];
    if (methodConfig.options) {
      Object.keys(methodConfig.options).forEach(optionName => {
        // $FlowFixMe
        const option = methodConfig.options[optionName];

        let arg = '';
        if (option.arg === 'required') arg = '<value>';
        else if (option.arg === 'optional') arg = '[value]';

        cmd.option(`-${option.shortcut || optionName[0]}, --${optionName} ${arg}`, option.description);
      });
    }
  }

  /*
   * Actions
   */

  play(methodName: string) {
    // $FlowFixMe
    const method: Function = this[methodName];
    if (!method) this.throwMethodNotImplemented(method);

    method();
  }

  /*
   * File Helpers
   */

  src(pattern: string): File[] {
    return glob.sync(pattern).map(path => new File(path));
  }

  delete(path: string) {
    const isDirectory = fs.lstatSync(path).isDirectory();

    if (isDirectory) fs.rmdir(path);
    else fs.unlink(path);
  }

  /*
   * Template Helpers
   */

  getTemplatesPath(): string {
    return '';
  }

  templates(pattern?: string) {
    const values = [this.getTemplatesPath(), '**'];
    if (pattern) values.push(pattern);

    return this.src(join(...values));
  }

  template(path: string): File {
    return new File(join(this.getTemplatesPath(), path));
  }

  /*
   * Chain helpers
   */

  generator(name: string): Generator {
    return this.samba.generator(name);
  }

  options(options: Options): this {
    this.options = options;
    return this;
  }

  args(args: Args): this {
    this.args = args;
    return this;
  }

  /*
   * Help
   */
  help() {
    console.log(chalk.yellow(this.name));

    this.methods.forEach(method => {
      const methodConfig = this.config[method];
      const alias = this.samba.alias(method);

      let text = chalk.green(`  ${method}`);
      if (alias) text += chalk.greenBright(`|${alias}`);

      text += ` ${this.name}`;
      if (methodConfig.args) text += ` ${methodConfig.args}`;

      console.log(text);

      if (methodConfig.options) {
        Object.keys(methodConfig.options).forEach(optionName => {
          console.log();

          // $FlowFixMe
          const option = methodConfig.options[optionName];

          let optionText = '    ';
          optionText += chalk.blueBright(`-${option.shortcut || optionName[0]} --${optionName}`);

          if (option.arg === 'required') {
            optionText += chalk.cyanBright(` value`);
          } else if (option.arg === 'optional') {
            // $FlowFixMe
            optionText += chalk.hex('#99C')(` value?`);
          }

          console.log(optionText);
          console.log(`      ${option.description}`);
        });
      }
    });
  }

  /*
   * Errors
   */

  throwMethodNotImplemented(method: string): void {
    throw new Error(`Method ${method} not implemented on generator ${this.constructor.name}`);
  }
}
