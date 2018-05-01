// @flow

import fs from 'fs';
import { join, basename, dirname } from 'path';
import chalk from 'chalk';
import program from 'commander';
import { execSync } from 'child_process';

import File from './File';
import Samba from './Samba';
import namedCasex from '../helpers/namedCasex';
import GeneratorMethod, { type MethodConfig } from './GeneratorMethod';

import log from '../helpers/log';

type Args = { [name: string]: string | string[] };
type Options = { [name: string]: string };

export default class Generator {
  options: Options;
  args: Args;

  /*
   * Register
   */

  name: string;
  path: string;
  samba: Samba;
  config: { [method: string]: MethodConfig };

  get methods(): GeneratorMethod[] {
    return Object.keys(this.config || {}).map(method => new GeneratorMethod(this, method));
  }

  /*
   * Actions
   */

  register(): void {
    if (!this.methods.length) {
      log.warn(`Skipping generator ${basename(this.path)} - no methods in 'config'`);
    }

    this.methods.forEach(method => method.register());
  }

  /*
   * Actions
   */

  async play(methodName: string) {
    // $FlowFixMe
    const method: Function = this[methodName];
    if (!method) this.throwMethodNotImplemented(method);

    log.emptyLine();
    log.success(`🥁  Playing: ${methodName} ${this.name}`);
    log.addIndentation();

    await method.bind(this)();

    log.removeIndentation();
    log.emptyLine();
  }

  /*
   * File Helpers
   */

  file(pattern: string, name?: string): File {
    const files = this.files(pattern, name);
    if (!files.length) throw new Error(`No file found for ${namedCasex(pattern, name)}`);

    return files[0];
  }

  files(pattern: string, name?: string): File[] {
    return File.glob(pattern, name);
  }

  delete(path: string): void {
    const isDirectory = fs.lstatSync(path).isDirectory();

    if (isDirectory) fs.rmdir(path);
    else fs.unlink(path);
  }

  /*
   * Template Helpers
   */

  get templatesPath(): string {
    return join(dirname(this.path), 'templates');
  }

  templates(pattern?: string): File[] {
    const values = [this.templatesPath, '**'];
    if (pattern) values.push(pattern);

    return this.files(join(...values));
  }

  template(path: string): File {
    return this.templates(path)[0];
  }

  /*
   * Chain helpers
   */

  generator(name: string): Generator {
    return this.samba.generator(name);
  }

  setOptions(options: Options): this {
    this.options = options;
    return this;
  }

  setArgs(args: Args): this {
    this.args = args;
    return this;
  }

  setArgsArray(method: string, values: string[]): this {
    const argsConfig = this.config[method].args;
    if (!argsConfig) return this;

    const args = {};
    argsConfig.split(' ').forEach((argString, index) => {
      const argName = argString.replace('?', '').replace(/[.?]/g, '');
      args[argName] = values[index];
    });

    return this.setArgs(args);
  }

  /*
   * Other helpers
   */

  exec(command: string): string | Buffer {
    log.success(`🏃  Exec command: ${command}`);
    log.addIndentation();
    const result = execSync(command);
    log.removeIndentation();
    return result;
  }

  /*
   * Help
   */

  help() {
    console.log(chalk.white(`🥁  ${this.name}`));
    this.methods.forEach(method => method.help());
  }

  /*
   * Errors
   */

  throwMethodNotImplemented(method: string): void {
    throw new Error(`Method ${method} not implemented on generator ${this.constructor.name}`);
  }
}
