// @flow

import fs from 'fs';
import { join, basename, dirname } from 'path';
import chalk from 'chalk';
import program from 'commander';
import { execSync } from 'child_process';
import rimraf from 'rimraf';

import File from './File';
import Battlecry from './Battlecry';
import GeneratorMethod, { type MethodConfig } from './GeneratorMethod';

import namedCasex from '../helpers/namedCasex';
import dd from '../helpers/dd';
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
  battlecry: Battlecry;
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

  async play(methodName: string): Promise<*> {
    try {
      // $FlowFixMe
      const method: Function = this[methodName];
      if (!method) this.throwMethodNotImplemented(methodName);

      log.emptyLine();
      log.success(`🥁  Playing: ${methodName} ${this.name}`);
      log.addIndentation();

      const response = method.bind(this)();
      if (response) await response;

      log.removeIndentation();
      log.emptyLine();
    } catch (error) {
      // Async/await must be wrapped by a try catch
      dd(error);
    }
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

  delete(path: string, name?: string): void {
    path = namedCasex(path, name);
    rimraf.sync(path);
    log.success(`🔥  Path deleted: ${path}`);
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

  template(pattern?: string): File {
    return this.templates(pattern)[0];
  }

  /*
   * Chain helpers
   */

  generator(name: string): Generator {
    return this.battlecry.generator(name);
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
      const value = values[index];

      const isVariadic = argString.includes('...');
      if (isVariadic && (!value || !value.length)) return;

      const argName = argString.replace('?', '').replace(/[.?]/g, '');
      args[argName] = value;
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
    log.default(chalk.white(`🥁  ${this.name}`));
    log.addIndentation();
    this.methods.forEach(method => method.help());
    log.removeIndentation();
  }

  /*
   * Errors
   */

  throwMethodNotImplemented(method: string): void {
    throw new Error(`Method ${method} not implemented on generator ${this.constructor.name}`);
  }
}
