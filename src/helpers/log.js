// @flow

import chalk from 'chalk';

const INDENTATION = '   ';

class Log {
  indentation: string = '';
  hasEmptyLine: boolean = false;

  addIndentation() {
    this.indentation += INDENTATION;
  }

  removeIndentation() {
    if (this.indentation.length)
      this.indentation = this.indentation.substring(0, this.indentation.length - INDENTATION.length);
  }

  log(chalker: Function, message: string) {
    this.hasEmptyLine = false;
    console.log(chalker(this.indentation + message));
  }

  default(message: string) {
    return this.log(chalkedMessage => chalkedMessage, message);
  }

  success(message: string) {
    this.log(chalk.green, message);
  }

  warn(message: string) {
    // $FlowFixMe
    this.log(chalk, `⚠️  ${message}`);
  }

  error(message: string) {
    this.log(chalk.red, message);
  }

  emptyLine() {
    if (this.hasEmptyLine) return;

    this.hasEmptyLine = true;
    console.log();
  }
}

export default new Log();
