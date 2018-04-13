// @flow

import File from 'classes/File';

export default class Generator {
  name: string;
  options: Object;
  args: string[];

  getCommandOptions() {}

  setup() {
    // this.getCommandOptions()
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

  /*
   * File Helpers
   */

  src(glob: string) {}

  copy(file: string) {}

  /*
   * Chain helpers
   */

  frame(frameClass: typeof Generator): Generator {
    return new Generator();
  }

  name(name: string): this {
    this.name = name;
    return this;
  }

  options(options: Object): this {
    this.options = options;
    return this;
  }

  args(args: string[]): this {
    this.args = args;
    return this;
  }

  /*
   * Errors
   */

  throwMethodNotImplemented(method: string): void {
    throw new Error(`Method ${method} not implemented on frame ${this.name}`);
  }
}
