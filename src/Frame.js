const File = require('./File');

/**
 * @prop {string} name
 * @prop {Object} options
 * @prop {string[]} args
 */
class Frame {
  setup() {}

  /*
   * Actions
   */

  generate() {
    this.throwMethodUndefined('generate');
  }

  rename() {
    this.throwMethodUndefined('rename');
  }

  destroy() {
    this.throwMethodUndefined('destroy');
  }

  /*
   * File helpers
   */

  src(glob: string) {}

  copy(file: string) {}

  /*
   * Errors
   */

  throwMethodUndefined(method) {
    throw new Error(`Method ${method} not implemented on frame ${this.name}`);
  }
}

module.exports = Frame;
