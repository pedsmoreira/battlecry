// @flow

import fs from 'fs';
import glob from 'glob';
import { join, basename } from 'path';
import chalk from 'chalk';

import aliases from 'aliases';

import File from 'classes/File';
import Samba from 'classes/Samba';

type Args = { [name: string]: string | string[] };
type Options = { [name: string]: string };

type ConfigArgs = string;
type ConfigOptions = { [name: string]: Object };
type MethodConfig = { options?: ConfigOptions, args?: ConfigArgs };

export default class Generator {
  samba: Samba;
  options: Options;
  args: Args;

  static additionalMethods: { [method: string]: string } = {};
  static config: { [method: string]: MethodConfig };

  get name(): string {
    return basename(__dirname).split('.')[0];
  }

  /*
   * Actions
   */

  generate() {
    this.throwMethodNotImplemented('generate');
  }

  destroy() {
    this.throwMethodNotImplemented('destroy');
  }

  play(action: string) {
    // $FlowFixMe
    const method = this[action];

    if (!method) {
      console.log(chalk.red(`Method ${action} not found in generator ${this.name}`));
      process.exit(1);
    }

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
   * Errors
   */

  throwMethodNotImplemented(method: string): void {
    throw new Error(`Method ${method} not implemented on generator ${this.name}`);
  }
}
